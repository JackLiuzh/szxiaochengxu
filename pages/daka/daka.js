// pages/daka/daka.js
const app = getApp()
const filter = require('../../utils/filter');
Page(filter.loginCheck({

  /**
   * 页面的初始数据
   */
  data: {
     hasMore: true,
     page: 1,
     perpage:20,
     datalist:[] 
  },
  
  loadMore() {
    if(!this.data.hasMore) return;

    wx.showLoading({ title: "拼命加载中..."});

    return app.wechat.getStorage("uid").then(dd => {
            if (dd.data) {
              var params = {
                "uid": dd.data,
                "page": this.data.page++,
                "perpage": this.data.perpage
              }
              app.sz.dakazhutilist(params).then(d => {
                if (d.data.data.length) {
                  this.setData({
                    datalist: this.data.datalist.concat(d.data.data)
                  })
                }else {
                   this.setData({
                      hasMore: false,
                      title:'没有更多了'
                   })
                }
              })
            } else {
              console.log("未获得用户uid")
            }
            wx.hideLoading();
          });
  },
  onSwitchnavto(e) {
     var state = e.currentTarget.dataset.state;
     var id = e.currentTarget.dataset.id;
     console.log(state)
     switch(state) {
        case 0:
          wx.navigateTo({
            url: '../daka_detail/daka_detail?id=' + id,
          });
          break;
        case 1:
          wx.navigateTo({
            url: '../daka_jiaru/daka_jiaru?id=' +id,
          });
          break;
        case 2:
          wx.navigateTo({
            url: '../daka_jiaru/daka_jiaru?id=' + id,
          });
          break;
     }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    app.wechat.getStorage("uid").then(d=>{
      var uid = d.data;
      app.globalData.uid = uid;
      
    })
    this.loadMore()
    
    //app.sz.dakazhutilist(params);
    
    
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
    
    return app.wechat.getStorage("uid").then(dd => {
      var toperpage = this.data.perpage*(this.data.page - 1)
      if (dd.data) {
        var params = {
          "uid": dd.data,
          "page": 1,
          "perpage": toperpage
        }
        app.sz.dakazhutilist(params).then(d => {
          if (d.data.data.length) {
            this.setData({
              datalist: d.data.data
            })
          } else {
            this.setData({
              hasMore: false,
              title: '没有更多了'
            })
          }
        })
      } else {
        console.log("未获得用户uid")
      }
      wx.hideLoading();
    });
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