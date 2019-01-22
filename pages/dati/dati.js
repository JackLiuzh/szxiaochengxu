// pages/dati/dati.js
var WxParse = require('../../components/wxParse/wxParse.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
     currentTab:0,
     clientHeight: 500,
     list:[],
     answers: {
       "uid" : 2,
       "totaltime": 12300,
       "ability_secondId": "",
       "ability_title": "分类名",
       "tot":5,
       "data": [
          {
             "type":1,
             "question_id": 23,
             "user_answer": 0,
             "duration": 12300,
             "iswrong":0
          }
       ]
     },
     starttime: '',//开始答题时间点
     endtime: '',//结束答题时间点
     uptime:'', //上一个结束点
     answerlist: [], //答题数组列表
     ability_secondId:'',//二级分类id
     tot:'',//试题总数
     uid: '',
     totaltime:'',
     ability_title:'',
     idarray:[]
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '拼命加载中...',
    })
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight
        });
      }
    });

    //根据ability_secondId 
    console.log(options.ability_secondId)
    this.setData({ ability_secondId: options.ability_secondId,uid: app.globalData.uid,ability_title: options.ability_title})
    var params = {
      "uid": app.globalData.uid,
      "ability_secondId": options.ability_secondId
    } 
    app.tiku.getquestions(params).then(d=>{
       if(d.data.data.length) {
           for (let i = 0; i < d.data.data.length; i++) {
             WxParse.wxParse('reply' + i, 'html', d.data.data[i].title, that)
             WxParse.wxParse('replynote' + i, 'html', d.data.data[i].note, that)
             if (i === d.data.data.length -1) {
                WxParse.wxParseTemArray("replyTemArray", 'reply', d.data.data.length, that)
                WxParse.wxParseTemArray("replyTemArrayNote", 'replynote', d.data.data.length, that)
             }
           }
           this.setData({list:d.data.data,tot: d.data.total})
           wx.hideLoading()
       }
       
    })

    // 记录开始时间点
    var starttime = new Date().getTime()
    this.setData({
       starttime : starttime,
       uptime : starttime
    })

    wx.setNavigationBarTitle({
      title: that.data.ability_title
    })

   
  },
  //触发选项按钮
  choosed: function (e) {

    var that =this
    var dd = this.data.list
    var xuanxiang = e.currentTarget.dataset.xuanxiang
    var answer = e.currentTarget.dataset.answer
    var id = e.currentTarget.dataset.id
    var option = e.currentTarget.dataset.option
    var xiang = e.currentTarget.dataset.xiang
    console.log("选中了:" + xuanxiang)
    var ability_id = e.currentTarget.dataset.ability_id
    if(xuanxiang == answer) {
      for (var index in dd) {
        if (dd[index].id == id){
          dd[index].xuanzhong = xiang
          dd[index].iscorrect=1
          that.setData({ currentTab: that.data.currentTab+1})
         }
      }
    }else {
      for (var index in dd) {
        if (dd[index].id == id) {
          dd[index].xuanzhong = xiang
          dd[index].iscorrect = 0
        }
      }
    }
    this.setData({ list: dd })
   
    console.log(this.data.list.length)
    
    //答每道题所花时间间隔
    var duration = ((new Date().getTime() - this.data.uptime)/1000).toFixed(0)
    
    //是否做错
    var iswrong = answer == xuanxiang ? 1 : 0
    
    var question = {
        "type": 1,
        "question_id" : id,
        "user_answer": xuanxiang,
        "ability_id": ability_id,
        "duration": duration,
        "iswrong": iswrong
    }
    this.data.answerlist.push(question)
    console.log(this.data.answerlist)
    //this.setData({ answerlist: this.data.answerlist})

    //更新上一次的时间戳
    this.setData({
      uptime: new Date().getTime(),
    })

    
  },

  
 
  swiperchange: function (e) {
    
    var that = this;
    var current = e.detail.current
    that.data.idarray.push(that.data.list[0].id)
    that.data.idarray.push(that.data.list[current].id);
    
    
    that.setData({ currentTab: current})
    console.log(current)
    var listlen = that.data.list.length;
    if((listlen-1) == (current) && that.data.tot!=listlen){
      wx.showLoading({
        title: '拼命加载中...',
      })

      var set1 = Array.from(new Set(that.data.idarray));
      that.data.idarray.concat(set1);

      var questionid_str = that.data.idarray.join(",")
      console.log("qu"+questionid_str)
      
      
      // var objDeepCopy = function (source) {
      //   var sourceCopy = source instanceof Array ? [] : {};
      //   for (var item in source) {
      //     sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item];
      //   }
      //   return sourceCopy;
      // }
      
      // var objCopy = objDeepCopy(this.data.list)
      // var neworry = this.data.list.concat(objCopy[0])
      // console.log(neworry)
      // this.setData({list: neworry})

      var params = {
        "uid": app.globalData.uid,
        "ability_secondId": that.data.ability_secondId,
        "questionid_str": questionid_str
      } 
      app.tiku.getquestions(params).then(d=>{
        console.log(d.data);
        //  console.log(d.data.data);
        var newarray = that.data.list.concat(d.data.data)
        //  this.setData({ list: newarray})

        if (newarray.length) {
          for (let i = 0; i < newarray.length; i++) {
            WxParse.wxParse('reply' + i, 'html', newarray[i].title, that)
            WxParse.wxParse('replynote' + i, 'html', newarray[i].note, that)
            if (i === newarray.length - 1) {
              WxParse.wxParseTemArray("replyTemArray", 'reply', newarray.length, that)
              WxParse.wxParseTemArray("replyTemArrayNote", 'replynote', newarray.length, that)
            }
          }
          that.setData({ list: newarray })
          wx.hideLoading()
        }


      })
      

    }
    
  },
  
  // 取消
  shoucangbut: function(e) {
     let id = e.currentTarget.dataset.id
     let list = this.data.list
     let current = e.currentTarget.dataset.current
     let utype = e.currentTarget.dataset.type 
     let uid = app.globalData.uid
     var params = {
        "uid" : uid,
        "type" : utype,
        "id" : '1-'+id
     }

    app.tiku.shoucang(params).then(d=>{
        if(d.data.status==0) {
           if(utype==0){
             this.data.list[current].iscollect = 0
             wx.showToast({ title: '取消收藏成功', icon: 'success', duration: 2000 })
           }else if(utype==1) {
             this.data.list[current].iscollect = 1
             wx.showToast({title: '收藏成功', icon: 'success', duration: 2000})
           }
           this.setData({list})
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
    app.aData.show = true;
    app.aData.answerquestions = this.data;
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    app.aData.show = false;
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var endtime = new Date().getTime();
    this.setData({endtime: endtime})
    var totaltime = ((this.data.endtime - this.data.starttime) / 1000).toFixed(0)
    this.setData({ totaltime: totaltime })
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