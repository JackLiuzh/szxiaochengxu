const app = getApp()
const filter = require('../../utils/filter');
// pages/shuati/shuati.js
Page(filter.loginCheck({

  /**
   * 页面的初始数据
   */
  data: {
    accuracy:'',//正确率
    score:'', //预测分
    user_zuoti_total: '',// 累计做题
    wrong_total:'',//错题数
    collect_total:'',//收藏数
    ability_list:[],//分类数组
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

     wx.showLoading({
       title: '拼命加载中...',
     })
     var params = {
        "uid": app.globalData.uid
     }
     app.tiku.shuati(params).then(d=> {
         if(d.data.data.ability_list.length){
            this.setData({
              accuracy: d.data.data.accuracy,
              score: d.data.data.score,
              user_zuoti_total: d.data.data.user_zuoti_total,
              wrong_total: d.data.data.wrong_total,
              collect_total: d.data.data.collect_total,
              ability_list: d.data.data.ability_list
            })
         }
         
         wx.hideLoading()
     })
  },
  listTap: function(e) {
    let Index = e.currentTarget.dataset.parentindex;
    let ability_list = this.data.ability_list;
    ability_list[Index].show = !ability_list[Index].show || false;
    if (ability_list[Index].show) {
      this.pickUp(ability_list,Index);
    }
    this.setData({ ability_list: ability_list})
  },

  pickUp: function(data, index) {
       for(let i = 0; i<data.length; i++) {
           if(index != i ){
               data[i].show = false
           }
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
  onShow: function (options) {
    let answerquestions = app.aData.answerquestions
    if (answerquestions && answerquestions.answerlist.length) {
      let self = this;
      let aShow = app.aData.show;
      if (aShow) {
        wx.showModal({
          title: '是否提交答案？',
          success: function (res) {
            app.aData.show = false;
            if (res.confirm) {
              self.submintanswer(answerquestions)
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }

    }else {
      this.onLoad()
    }
    
    
  },

  //提交答案
  submintanswer: function (obj) {
    var that =this
    wx.showLoading({
      title: '正在提交中...',
    })
      var params = {
         "uid": obj.uid,
         "totaltime": obj.totaltime,
         "ability_secondId": obj.ability_secondId,
         "ability_title": obj.ability_title,
         "tot": obj.tot,
         "data": obj.answerlist,
         
      }
      console.log(params)
      app.tiku.tijiao(params).then(d=>{
          //console.log(d)
          if(d.data.status==0){
             console.log("提交答案成功")
             wx.hideLoading()
             that.onLoad()
          }
      })
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
}))