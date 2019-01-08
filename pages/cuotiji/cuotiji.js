const app = getApp()
// pages/shuati/shuati.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     list: [
       {
          firstName: "常识",
          firstNum: 586,
          firsttotal: 300,
          item: [
            {
              secondName: "人文与历史",
              secondNum: 826,
              secondtotal: 900
            },
            {
              secondName: "地理与环境",
              secondNum: 82,
              secondtotal: 90
            }
          ]
         },
       {
          firstName: "判断推理1",
          firstNum: 5669,
          firsttotal: 300,
          item: [
            {
              secondName: "判断1",
              secondNum: 89,
              secondtotal: 90
            },
            {
              secondName: "判断2",
              secondNum: 90,
              secondtotal: 90
            }
          ]
       },
       {
         firstName: "判断推理2",
         firstNum: 5669,
         firsttotal: 300,
         item: [
           {
             secondName: "判断1",
             secondNum: 89,
             secondtotal: 90
           },
           {
             secondName: "判断2",
             secondNum: 90,
             secondtotal: 90
           }
         ]
       }
     ],
     datalist : []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var uid = app.globalData.uid
    var parmas = {
      'uid': uid
    }
    app.tiku.cuotilist(parmas).then(d=>{
        console.log(d)
        if (d.data.data.length) {
          that.setData({
            datalist: d.data.data
          })
        }
    })
  },
  listTap: function(e) {
      let Index = e.currentTarget.dataset.parentindex;
      let datalist = this.data.datalist;
      datalist[Index].show = ! datalist[Index].show || false;
      if(datalist[Index].show) {
        this.pickUp(datalist, Index)
      }
      this.setData({datalist})
  },
  pickUp: function(data, index) {
      for (let i = 0; i < data.length; i++ ) {
         if(index != i) {
             data[i].show = false;
         }
      }
  },

  //跳转到commondati 
  navcommondati: function(e) {
    var id = e.currentTarget.dataset.id
    var towhere = e.currentTarget.dataset.towhere
    wx.navigateTo({
      url: '/pages/commondati/commondati?second_id=' + id + '&towhere=' + towhere,
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
      this.onLoad()
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