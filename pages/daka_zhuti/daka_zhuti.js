// pages/daka_zhuti/daka_zhuti.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
     clock_id:'',
     list: [],
     page: 1,
     perpage: 20,
     hasMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({clock_id : options.clock_id})
      this.loadMore()
  },
  loadMore () {
        if(!this.data.hasMore) return
        wx.showLoading({
          title: '拼命加载中',
        })
        var params = {
          "clock_id": this.data.clock_id,
          "uid": app.globalData.uid,
          "page": this.data.page++,
          "perpage": this.data.perpage
        }
    return app.sz.dakazhutizilist(params).then(d => {
          if (d.data.list.length) {
            this.setData({ list: this.data.list.concat(d.data.list) })
          } else {
            this.setData({ hasMore: false })
          }
          wx.hideLoading();
        }) 
  },

  isjump (e) {
    console.log(e)
    var clock_list_id = e.currentTarget.dataset.id;
    var guan_num = e.currentTarget.dataset.guan_num;
    // var uid = app.globalData.uid;
    if (e.currentTarget.dataset.deblocking){
      if (e.currentTarget.dataset.ifdaka==1){
        wx.navigateTo({
          url: '../daka-zhuti-detaildone/daka-zhuti-detaildone?clock_list_id=' + clock_list_id + '&guan_num=' + guan_num,
        })
      }else {
        wx.navigateTo({
          url: '../daka-zhuti-detail/daka-zhuti-detail?clock_list_id=' + clock_list_id + '&guan_num=' + guan_num,
        })
      }
     }else{
        wx.showToast({
          title: '尚未解锁！',
          icon: 'none'
        })
     }
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
})