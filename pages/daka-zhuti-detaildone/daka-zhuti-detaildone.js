// pages/daka-zhuti-detaildone/daka-zhuti-detaildone.js
var WxParse = require('../../components/wxParse/wxParse.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList: [],
    sourceTypeIndex: 2,
    sizeTypeIndex: 2,
    countIndex: 1,
    list: '',
    user_record: '',
    user_total_days: '',
    user_record: [],
    guan_num: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({ guan_num: options.guan_num })
    var params = {
      "uid": app.globalData.uid,
      "clock_list_id": options.clock_list_id
    }
    app.sz.dakazhutidetail(params).then(d => {
      if (d.data.status == 0) {
        that.setData({
          list: d.data.list,
          user_record: d.data.user_record,
          user_total_days: 1
        });
        //console.log(d.data.list.content)
        WxParse.wxParse('content', 'html', d.data.list.content, that, 5);
      }
    })
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

  }
})