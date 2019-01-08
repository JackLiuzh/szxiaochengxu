const URI = 'http://cs.szgk.cn/api.php'
//const URI = 'http://sz.com/api.php'
const fetch = require('./fetch')

function loginregister(params) {
  return fetch.szfetch(URI,"xcxlogin",params)
}

//获得打卡主题列表daka 页面
function dakazhutilist(params) {
  return fetch.szfetch(URI,"clockselect",params)
}

//打卡 - 打卡主题
function dakazhuti(params) {
  return fetch.szfetch(URI,"clockdetail",params)
}

//进入立即加入页面daka_detail
function dakadetail(params) {
  return fetch.szfetch(URI, "addclockdetail", params)
}

//加载更多打卡日记daka_detail页
function dakadetailemore(params) {
  return fetch.szfetch(URI, "clockcomment", params)
}

//daka_detail页面立即加入
function dakadetailjiarubut(params) {
  return fetch.szfetch(URI, "addclockuser", params)
}

//daka_jiaru页面初始化接口
function dakajiaru(params) {
  return fetch.szfetch(URI, "clockdetail", params)
}

//daka_zhuti 页面初始化列表
function dakazhutizilist(params) {
  return fetch.szfetch(URI, "clocklistselect", params)
}

//daka-zhuti-detail 页面初始化
function dakazhutidetail (params) {
  return fetch.szfetch(URI, "clocklistdetail", params)
}

//daka-zhuti-detail 发表打卡日记
function dakazhutidetail_submit(params) {
  return fetch.szfetch(URI, "clocklistsave", params)
}

//my-yijian 提交反馈信息
function myfankui(params) {
  return fetch.szfetch(URI, "addenroll", params)
}

//随机返回海报内容的接口
function haibao() {
  return fetch.szfetch(URI, "clockplacardfind")
}

//我打卡记录 my 
function my(params) {
  return fetch.szfetch(URI,"selectuserclockrecord",params)
}

// daka-zhuti-detail 获得海报信息
function gethaibaoinfo() {
  return fetch.szfetch(URI, "clockplacardfind")
}

// daka-setting 设置打卡提醒
function dakasetting(params) {
  return fetch.szfetch(URI, "clockset", params)
}
// 获取打卡设置参数
function clocksetinfo(params) {
  return fetch.szfetch(URI,"clocksetinfo", params)
}

module.exports = { loginregister, dakazhutilist, dakazhuti, dakadetail, dakadetailemore, dakadetailjiarubut, dakajiaru, dakazhutizilist, dakazhutidetail, dakazhutidetail_submit, myfankui, my, gethaibaoinfo, dakasetting, clocksetinfo}