// pages/daka-setting/daka-setting.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
     clock_id : '',
     pushmsg_switch:0,
     setting:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({clock_id: options.clock_id})
      var uid = app.globalData.uid
      var clock_id = options.clock_id
      var params = {
         "uid":uid,
         "clock_id":clock_id
      }
    return app.sz.clocksetinfo(params).then(d=>{
        if(d.data.status==0){
          console.log(d.data.data)
          if(d.data.data.pushmsg_switch>0){
            this.setData({ pushmsg_switch: 1})
          }
          if (d.data.data.set>0) {
            this.setData({ setting: 1 })
          }  
        }else{
           console.log("接口错误")
        }
    })

  },
  switch2Change(e) {
    console.log('switch2 发生 change 事件，携带值为', e.detail.value)
  },
  formSubmit(e) {
    //wx.showLoading({title:"提交中..."})
    var uid = app.globalData.uid
    var formid = e.detail.formId
    var clock_id = this.data.clock_id
    var istuichu = e.detail.value.istuichu == true ? 1 : 0
    var istixing = e.detail.value.istixing == true ? 1 : 0
    var params = {
       uid : uid,
       form_id : formid,
       clock_id : clock_id,
       clock_isout : istuichu,
       pushmsg_switch : istixing
    }
    console.log(params)
    app.sz.dakasetting(params).then(d => {
        if(d.data.status == 0){
           //wx.hideLoading()
           wx.showToast({title: '成功', icon: 'success',duration : 2000})
           wx.switchTab({
             url: '../daka/daka',
           })
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