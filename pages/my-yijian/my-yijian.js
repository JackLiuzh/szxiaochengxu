// pages/my-yijian/my-yijian.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     
  },
  formSubmit : function(e) {
    if(e.detail.value.fankui.length >=1){
          wx.showLoading({
            title: '提交中',
          })
          var params = {
            "uid": app.globalData.uid,
            "comment": e.detail.value.fankui,
            "contact": "小程序"
          }
          app.sz.myfankui(params).then(d => {
            console.log(d)
            if (d.data.status == 0) {
              wx.hideLoading()
              wx.showToast({
                title: '问题反馈成功！',
                icon: 'success',
                duration: 2000
              })
            }
          })
    }else {
         wx.showToast({
           title: '请输入内容！',
           icon:'none',
           duration:200
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})