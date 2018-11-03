const URI = 'http://cs.szgk.cn/api.php'
const fetch = require('./fetch')

function wwwget(type, params) {
   return fetch.szfetch(URI, type, params)
}
module.exports = { wwwget }