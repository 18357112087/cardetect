const db = wx.cloud.database()

module.exports.onQuery = function (englishName, fn) {

  console.log(englishName)
  db.collection('actors').where({
    englishName:englishName
  }).get({
    success: res => {
      fn("success", res)
      console.log('[数据库] [查询记录] 成功: ', res.data)
    },
    fail: err => {
      fn("fail", err)
      console.error('[数据库] [查询记录] 失败：', err)
    }
  })
}

// module.exports.translator = {
//   "NanamiMatsumoto":"松本菜奈实",
//   "YuiHatano":"波多野结衣",
//   "AiUehara":"上原亚衣",
//   "Rion": "宇都宮紫苑",
//   "SolaAoi":"苍井空",
//   "YuuAsakura":"麻仓优",
//   "AnriOkita":"冲田杏梨",
//   "EimiFukada":"深田咏美",
//   "KahoShibuya":"涉谷果步",
//   "NanamiMatsumoto":"松本菜奈实"
// }