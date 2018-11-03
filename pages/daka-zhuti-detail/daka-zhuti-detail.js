// pages/daka-zhuti-detail/daka-zhuti-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      imageList: [],
      sourceTypeIndex: 2,
      sizeTypeIndex: 2
  },

  //点击选取选取或拍照按钮
  chooseImage() {
     const that = this
     wx.chooseImage({
         sourceType: this.data.sourceTypeIndex,
         sizeType: this.data.sizeTypeIndex,
         success(res) {
           console.log(res)
           that.setData({
              imageList: res.tempFilePaths
           })
         }

     })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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