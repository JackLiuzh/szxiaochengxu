// pages/dati/dati.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     "currentTab":"",
     "clientHeight": 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //创建节点选择器
    var query = wx.createSelectorQuery();
    //选择id
    query.select('#mydocumheight').boundingClientRect()
    query.exec(function (res) {
      //res就是 所有标签为mjltest的元素的信息 的数组
      console.log(res);
      //取高度
      console.log(res[0].height);
      var ddd = res[0].height;
      that.setData({ clientHeight: ddd})
    })
      wx.getSystemInfo({
        success: function (res) {
          // that.setData({
          //   clientHeight: res.windowHeight
          // });
          console.log("dd"+res.windowHeight)
        }
      });
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

})