/*

{
  "info": {
    "id": "3",
    "name": "23天笔试考试",
    "picture": "http://szgk-1256006778.cos.ap-beijing.myqcloud.com/20181108ffe7135497ece84634101ac9ef705dc8-w0.jpg",
    "body": "",
    "position": "0",
    "created_uid": "528",
    "created_name": "12332",
    "created": "1541644953",
    "status": "0"
  },
  "join_useravatr_third": [
    "http://szgk-1256006778.cos.ap-beijing.myqcloud.com/2018052365bb8fb45c67a48f488edde36626ddde-intro.jpg",
    "http://szgk.oss-cn-qingdao.aliyuncs.com/2018030532ed3e7b7a30a6e4ccc51f7ed123973d-avatar_733471.jpg",
    "http://szgk.oss-cn-qingdao.aliyuncs.com/2018030626893dd15426fb872088f0ce5c554f01-avatar_555576.jpg"
  ],
  "daka_usernum": 1,
  "join_usernum": 4,
  "comment_list": [
    {
      "id": "10",
      "uid": "528",
      "clock_id": "3",
      "clock_list_id": "6",
      "img_url": "http://szgk-1256006778.cos.ap-beijing.myqcloud.com/201811050901a62a32bf77967285e202d07ea5a5-gs.jpg",
      "content": "pinglun",
      "type": "1",
      "created": "0",
      "user_name": "12332",
      "user_avatar": "http://szgk-1256006778.cos.ap-beijing.myqcloud.com/2018052365bb8fb45c67a48f488edde36626ddde-intro.jpg",
      "user_total_keshi": "1",//已坚持多少天
      "clock_list_title": "笔试",
      "dakakeshi": "1"
    }
  ],
  "__webviewId__": 271
}

*/



// pages/user/user.js

var WxParse = require('../../components/wxParse/wxParse.js');
const app = getApp()
const filter = require('../../utils/filter');
Page(filter.loginCheck({
  data: {
     clock_id:'',
     info:'',
     join_useravatr_third:[],
     daka_usernum:'',
     join_usernum:'',
     comment_list:[],
     page:2,
     perpage:20,
     hasMore: true
  },
  onLoad: function (options) {
    var that = this
    wx.showLoading({
      title: '拼命加载中...',
    });
    var uid = app.globalData.uid;
    this.setData({ clock_id: options.id});
    // var uid = wx.getStorage('uid');
    // console.log("这是uid" + uid);
    var params = {
      "uid": uid,
      "clock_id":options.id
    }
    app.sz.dakadetail(params).then( d=> {
       var result = d.data;
       if(result.status==0){
          var redata = result.data;
          this.setData({
             info: redata.info,
             join_useravatr_third: redata.join_useravatr_third,
             daka_usernum: redata.daka_usernum,
             join_usernum: redata.join_usernum,
             comment_list: redata.comment_list
          })
         WxParse.wxParse('content', 'html', redata.info.body, that, 5);
       }else{
         console.log("接口错误")
       }
       wx.hideLoading()
    })
    
    

  },

  loadMore () {
    if(!this.data.hasMore) return;
    wx.showLoading({
       title: '拼命加载中...',
    });
    var params = {
      "clock_id": this.data.clock_id,
      "page": this.data.page++,
      "perpage": this.data.perpage
    }
    return app.sz.dakadetailemore(params).then(d=> {
      if (d.data.data.length){
        this.setData({ comment_list: this.data.comment_list.concat(d.data.data) })
      }else {
        this.setData({ hasMore:false })
      }
      wx.hideLoading()
    })
  },
  lijiaru:function () {
    var that = this
    var clock_id = that.data.clock_id
    var params = {
       "uid": app.globalData.uid,
       "clock_id": clock_id
    }
    return app.sz.dakadetailjiarubut(params).then( d=> {
      if(d.data.status==0){
         wx.showToast({ title:'加入成功', icon: 'success', duration:2000 });
        //  wx.navigateTo({
        //     url: '../daka_zhuti/daka_zhuti?clock_id=' + clock_id
        //  })
         wx.navigateTo({
           url: '../daka_jiaru/daka_jiaru?id=' + clock_id,
         })
      }
    })
  },

  onReachBottom () {
     this.loadMore()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //  var options = {
    //     "id": this.data.clock_id
    //   }
    //   console.log("zheshi"+options.id);
    //   this.onLoad(options);
  },
  
}));