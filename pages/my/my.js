// pages/my/my.js
const filter = require('../../utils/filter');
const app = getApp()
Page(filter.loginCheck({

  /**
   * 页面的初始数据
   */
  data: {
     page: 1,
     perpage: 20,
     list: [],
     hasMore: true,
     userInfo: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.loadMore()
    app.wechat.getStorage("userInfo").then(d=>{
        that.setData({userInfo: d.data})
    })
     //this.setData({userInfo : })
  },
  
  loadMore () {
      if(!this.data.hasMore) return
      wx.showLoading({
        title: '拼命加载中...',
      })
      var params = {
        "uid": app.globalData.uid,
        "page": this.data.page++,
        "perpage": this.data.perpage
      }
      return app.sz.my(params).then(d=>{
          if(d.data.status==0) {
              if(d.data.data.length) {
                 this.setData({
                     list: this.data.list.concat(d.data.data)
                 })
              } else {
                 this.setData({
                     hasMore: false
                 })
              }
          }else {
             console.log("接口异常")
          }
          wx.hideLoading()
      })
      .catch(d => {
           console.error(d)
           wx.hideLoading()
      })

  },
  imgYu: function (event) {
    var list = new Array()
    var src = event.currentTarget.dataset.src
    list[0] = src
    wx.previewImage({
      urls: list,
      current: src
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
     this.loadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
}))