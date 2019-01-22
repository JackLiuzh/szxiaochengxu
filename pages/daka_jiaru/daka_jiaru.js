// pages/user/user.js
const app = getApp();
const filter = require('../../utils/filter');
Page(filter.loginCheck({
  data: {
     clock_id :'',
     clock_info:'',
     daka_usernum: '',
     join_usernum: '',
     comment_list:[],
     guan_list_info:'',
     guan_num:'',
     total_guan_count:'',
     today_ifdaka:'',
     page:1,
     perpage:20,
     hasMore: false
  },
  onLoad: function (options) {
    // wx.showLoading({
    //   title: '拼命加载中...',
    // })  
    var uid = app.globalData.uid;
    this.setData({clock_id: options.id});
    // var params = {
    //   "uid":uid,
    //   "clock_id":options.id
    // }
    // app.sz.dakajiaru(params).then(d=>{
    //    if(d.data.status==0) {
    //        this.setData({ 
    //          today_ifdaka: d.data.data.today_ifdaka,
    //          clock_info : d.data.data.clock_info,
    //          daka_usernum :d.data.data.daka_usernum,
    //          join_usernum : d.data.data.join_usernum,
    //          comment_list : d.data.data.comment_list,
    //          guan_list_info : d.data.data.guan_list_info,
    //          total_guan_count: d.data.data.total_guan_count,
    //          guan_num: d.data.data.guan_num
    //        })
    //    }
    // });
    // wx.hideLoading();

  },
  // 获取更多打卡日记
  loadMore () {
    if(!this.data.hasMore) return;
    wx.showLoading({
      title: '拼命加载中...',
    })
    var params = {
      "clock_id" : this.data.clock_id,
      "page" : this.data.page,
      "perpage": this.data.perpage
    }
    return app.sz.dakadetailemore(params).then(d=>{
      if (d.data.data.length) {
        this.setData({ comment_list: this.data.comment_list.concat(d.data.data.comment_list) })
      } else {
        this.setData({ hasMore: false })
      }
      wx.hideLoading()
    })
  },

  goallzhuti (e) {
    var clock_id = e.currentTarget.dataset.clock_id;
    wx.navigateTo({
      url: '../daka_zhuti/daka_zhuti?clock_id=' + clock_id,
    });
  },
  gocurrent (e) {
    var clock_id = e.currentTarget.dataset.clock_id;
    wx.navigateTo({
      url: '../daka_zhuti/daka_zhuti?clock_id=' + clock_id,
    });
  },
  onReachBottom() {
    this.loadMore()
  },
  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
    wx.showLoading({
      title: '拼命加载中...',
    })
    var uid = app.globalData.uid;
    
    var params = {
      "uid": uid,
      "clock_id": this.data.clock_id
    }
    app.sz.dakajiaru(params).then(d => {
      if (d.data.status == 0) {
        this.setData({
          clock_info: d.data.data.clock_info,
          daka_usernum: d.data.data.daka_usernum,
          join_usernum: d.data.data.join_usernum,
          comment_list: d.data.data.comment_list,
          guan_list_info: d.data.data.guan_list_info,
          total_guan_count: d.data.data.total_guan_count,
          today_ifdaka: d.data.data.today_ifdaka,
          guan_num: d.data.data.guan_num
        })
      }
    });
    wx.hideLoading();
    
  },
  onHide: function(){
      
  },
  onUnload:function(){
    var isbackwhere = this.data.today_ifdaka
    if (isbackwhere) {
      wx.switchTab({
        url: '../daka/daka',
      })
    }
  },

  imgYu: function(event) {
    var list = new Array()
    var src = event.currentTarget.dataset.src
    list[0] = src
     wx.previewImage({
       urls: list,
       current: src
     })

  }

}));
