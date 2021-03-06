const app = getApp()
// pages/shuati/shuati.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      list: [
       {
          firstName:"常识",
          firstNum:586,
          firsttotal:300,
          item:[
            {
              secondName:"人文与历史",
              secondNum:826,
              secondtotal:900
            },
            {
              secondName: "地理与环境",
              secondNum: 82,
              secondtotal:90
            }
          ]
       },
       {
          firstName:"判断推理",
          firstNum:5669,
          firsttotal: 300,
          item:[
            {
              secondName:"判断1",
              secondNum:89,
              secondtotal: 90
            },
            {
              secondName:"判断2",
              secondNum:90,
              secondtotal: 90
            }
          ]
       }

      ],
      datalist: []
  },
  // 点击第一层
  listTap(e) {
    let Index = e.currentTarget.dataset.parentindex,//获得点击的下标值
      datalist = this.data.datalist;
    datalist[Index].show = ! datalist[Index].show || false;//记录变换其打开、关闭的状态,true 代表已展开，false 未打开
    if(datalist[Index].show) {
        //执行， 让其他展开的变为收齐状态
      this.packUp(datalist, Index);
    }
    this.setData({datalist})
  },

  //收起所有的展开项
  packUp(data, index) {
     for( let i = 0; i < data.length; i++ ) {
       if(index != i) {
          data[i].show = false;
       }
     }
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
    app.tiku.shoucanglist(parmas).then(d => {
        console.log(d)
        if(d.data.data.length) {
           that.setData({
             datalist: d.data.data
           })
        }
    })
  },

  //跳转到commondati 页 
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