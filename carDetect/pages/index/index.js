const app = getApp()
const db = wx.cloud.database()
const ActorNameTranslator = require('../../model/actorNameTranslator.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    carType:'',
    actorPicture:'../../images/plus.png',
    openid:'',
    cars:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
      console.log(this.data.openid)
    }
    const db = wx.cloud.database()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  },
  getImage:function(){
    var that = this
    wx.chooseImage({
      success: function(res) {
        that.setData({
          actorPicture: res.tempFilePaths[0]
        })
    const FileSystemManager = wx.getFileSystemManager()
    //img = base64_encode('meinv.jpg')
    FileSystemManager.readFile({
      filePath: res.tempFilePaths[0], encoding: 'base64', success: (res) => {
        wx.cloud.callFunction({
          name: 'face',
          data: {
            img_BASE64: res.data,
          },
          success: res => {
            console.log(res)
            if (res.result!=null)
           { wx.showToast({
              icon: 'success',
              title: '调用成功',
            })
            var data = res.result
            console.log(data)
            var JSONData = JSON.parse(data) 
              console.log(JSONData.result)
              console.log(JSONData.error_msg)
              that.setData({
                cars:JSONData.result
              })

              // ActorNameTranslator.onQuery(JSONData.result.user_list[0].user_id,function(message,res){
              //   if(message==='success')
              //   {
              //     that.setData({
              //       actorName: "女优姓名:"+res.data[0].chineseName,
              //       brief: "简介："+res.data[0].brief,
              //       experience: "经历:"+res.data[0].experience,
              //       cup: "罩杯:"+res.data[0].cup,
              //       BWH: "三围:"+res.data[0].BWH
              //     })
              //   }
              //   else{
              //     wx.showToast({
              //       icon: 'none',
              //       title: '未在数据库中查询到女优英文名，用原有英文名',
              //     })
              //     that.setData({
              //       actorName: JSONData.result.user_list[0].user_id
              //     })

              //   }
              // })
              
           
           
           }
           else{
              wx.showToast({
                icon: 'none',
                title: '调用失败,请重新上传图片',
              })

           }
            fail: err => {
              wx.showToast({
                icon: 'none',
                title: '调用失败',
              })
              console.error('[云函数] [sum] 调用失败：', err)
            }
            //fn()
          }
        })

      },
    })
      }
    })
  }


    
  
})