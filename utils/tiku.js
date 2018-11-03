const URI = 'http://ti.szgk.cn/index.php/szgk/index'
const fetch = require('./fetch')


function getexamper(type, params) {
     return fetch.tikufetch(URI, type, params)
}

module.exports = { getexamper }