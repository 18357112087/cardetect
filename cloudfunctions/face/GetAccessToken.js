var https = require('https');
var qs = require('querystring');
const param = qs.stringify({
  'grant_type': 'client_credentials',
  'client_id': 'j152Z4F8ItAsPaacO7FPndpH',
  'client_secret': '1Y6GqUGNEOG3zk0gNZjT6jaUCW8r224A'
});
module.exports.getAccessToken = new Promise((resolve, reject) =>{
https.get(
    {
        hostname: 'aip.baidubce.com',
        path: '/oauth/2.0/token?' + param,
        agent: false
    },
    function (res) {
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        // 在标准输出中查看运行结果
        access_token = res.access_token
        //res.pipe(process.stdout)
        res.on('end', () => {
            try {
              const parsedData = JSON.parse(rawData);
             resolve(parsedData.access_token)
            } catch (e) {
              console.error(e.message);
              reject(e.message)
            }
          })
        }
)
})