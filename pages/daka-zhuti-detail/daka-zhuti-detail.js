// pages/daka-zhuti-detail/daka-zhuti-detail.js
var WxParse = require('../../components/wxParse/wxParse.js');
const util = require('../../utils/util');
const  app = getApp();
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
      imageList: [],
      sourceTypeIndex: 2,
      sizeTypeIndex: 2,
      countIndex:1,
      list : '',
      user_record : [],
      user_total_days : '',
      user_record : [],
      guan_num : '',
      urlimg: '',
      
      maskHidden: false,
      nickName: '',
      avatarUrl:'',
      imagePath:'',
      haibaoinfo: ''
  },

  //点击选取选取或拍照按钮
  chooseImage() {
     const that = this
     wx.chooseImage({
         count: 1,
         sourceType: ['album', 'camera'],
         sizeType: 1,
         success: function(res) {
           that.setData({
             imageList : res.tempFilePaths
           })
           console.log(res)
           var uid = app.globalData.uid;
           app.wechat.uploadFile(res.tempFilePaths[0], 'file', uid).then(d=>{
             var obj = JSON.parse(d.data)
             that.setData({
               urlimg: obj.url
             });
             console.log("上传成功")
           })
         }

     })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that =this;
    that.setData({ guan_num: options.guan_num})
    var params = {
      "uid": app.globalData.uid,
      "clock_list_id": options.clock_list_id
    }
    app.sz.dakazhutidetail(params).then(d => {
        if(d.data.status==0){
          that.setData({
             list: d.data.list,
             user_record:d.data.user_record,
             user_total_days: 1
           });
          //console.log(d.data.list.content)
          WxParse.wxParse('content', 'html', d.data.list.content, that, 5);
        }
    });

    wx.getStorage({
      key: 'userInfo',
      success(res) {
        that.setData({
          nickName: res.data.nickName,
          avatarUrl: res.data.avatarUrl
        })
      }
    })

    //获得海报信息
    app.sz.gethaibaoinfo().then(d=>{
       console.log("获取海报接口："+ d)
       if(d.data.status==0){
          that.setData({haibaoinfo: d.data.data})
         that.setData({ ['haibaoinfo.guan_num']: options.guan_num, ['haibaoinfo.total_guan_num']: options.total_guan_num, ['haibaoinfo.zhutiname']: that.data.list.title})
       }else {
          console.log("海报接口有错误") 
       }
    })

    

    
  },

  //关闭海报
  closeaction: function() {
      this.data.maskHidden=false
  },
  
  // 生成海报方法
  //将canvas转换为图片保存到本地，然后将图片路径传给image图片的src
  createNewImg: function () {
    var that = this;
    var context = wx.createCanvasContext('mycanvas');
    context.setFillStyle("white")
    context.fillRect(0, 0, 375, 667)
    var path = "../../images/photo.png";
    //将模板图片绘制到canvas,在开发工具中drawImage()函数有问题，不显示图片
    //不知道是什么原因，手机环境能正常显示
    context.drawImage(path, 0, 0, 375, 500);
    //绘制头像

    context.save();
    context.beginPath();
    context.arc(66, 500, 46, 0, 2 * Math.PI); //画出圆
    context.setStrokeStyle('white');
    context.stroke();
    context.clip();
    var path1 = that.data.avatarUrl;
    context.drawImage(path1, 20, 454, 92, 92);
    context.restore();
    // console.log(path1, "path1")
    //将模板图片绘制到canvas,在开发工具中drawImage()函数有问题，不显示图片
    // var path2 = "../../images/cuotiji@2x.png";
    // var path3 = "../../images/cuotiji@2x.png";
    // var path4 = "../../images/cuotiji@2x.png";
    // var path5 = "../../images/cuotiji@2x.png";
    // context.drawImage(path2, 126, 186, 120, 120);
    //不知道是什么原因，手机环境能正常显示
    // context.save(); // 保存当前context的状态
    context.beginPath();
    var name = that.data.nickName;
    //绘制名字
    context.setFontSize(24);
    context.setFillStyle('#333333');
    context.setTextAlign('center');
    context.fillText(name, 66, 570);
    context.stroke();

    context.beginPath();
    var text = '似乎大家都是这样自命不凡，却无足轻重';
    var chr = text.split("");
    var temp = "";
    var row = [];
    context.setFontSize(30);
    context.setFillStyle("#fff");
    context.setTextAlign('center');
    for (var a = 0; a < chr.length; a++) {
      if (context.measureText(temp).width < 250) {
        temp += chr[a];
      } else {
        a--;
        row.push(temp);
        temp = "";
      }
    }
    row.push(temp);
    //如果数组长度大于2 则截取前两个
    if (row.length > 2) {
      var rowCut = row.slice(0, 2);
      var rowPart = rowCut[1];
      var test = "";
      var empty = [];
      for (var a = 0; a < rowPart.length; a++) {
        if (context.measureText(test).width < 220) {
          test += rowPart[a];
        }
        else {
          break;
        }
      }
      empty.push(test);
      var group = empty[0] + "..."//这里只显示两行，超出的用...表示
      rowCut.splice(1, 1, group);
      row = rowCut;
    }
    for (var b = 0; b < row.length; b++) {
      context.fillText(row[b], 185, 240 + b * 30, 300);
    }
    context.stroke();

    context.moveTo(150, 300);
    context.lineTo(200, 300);
    context.setStrokeStyle('white');
    context.stroke();

    context.setFontSize(30);
    context.setFillStyle('white');
    context.setTextAlign('center');
    context.fillText("环形使者", 185, 350, 100);
    context.stroke();

    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000
    var timeunix = timestamp;
    var timestr = util.formatTime(timeunix, 'Y-M-D');
    var timearr = timestr.split('-');

    context.setFontSize(40);
    context.setFillStyle('#fff');
    context.setTextAlign('left');
    context.fillText(timearr[2], 160, 100);
    context.stroke();

    context.setFontSize(20);
    context.setFillStyle('#fff');
    context.setTextAlign('left');
    context.fillText(timearr[1], 165, 130);
    context.stroke();

    context.setFontSize(20);
    context.setFillStyle('#fff');
    context.setTextAlign('left');
    context.fillText(timearr[0], 160, 150);
    context.stroke();

    context.setStrokeStyle('white');
    context.strokeRect(146, 60, 69, 101);
    //绘制左下角文字背景图
    // context.drawImage(path4, 25, 520, 184, 82);
    context.setFontSize(20);
    context.setFillStyle('#333');
    context.setTextAlign('left');
    context.fillText(that.data.list.title.substr(0,5), 35, 600);
    context.stroke();

    context.setFontSize(18);
    context.setFillStyle('#333');
    context.setTextAlign('left');
    context.fillText("第"+that.data.haibaoinfo.guan_num+"/"+that.data.haibaoinfo.total_guan_num+"课打卡", 35, 630);
    context.stroke();

    context.drawImage("../../images/xiao_icon.jpg", 260, 530, 100, 100); // 在刚刚裁剪的园上画图
    context.draw();
    //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
    setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'mycanvas',
        success: function (res) {
          console.log(res)
          var tempFilePath = res.tempFilePath;

          that.setData({
            imagePath: tempFilePath,
            // canvasHidden: true
          });
        },
        fail: function (res) {
          console.log(res);
        }
      });
    }, 300);
  },



  //提交日记
  formSubmit (e) {
    var that = this;
    wx.showLoading({
      title: '提交中...',
    })
    var rijitext = e.detail.value.rijitext;
    var params = {
        "content" : rijitext,
        "clock_id": that.data.list.clock_id,
        "clock_list_id": that.data.list.id,
        "uid" : app.globalData.uid,
        "imgFile": that.data.urlimg
    }
    app.sz.dakazhutidetail_submit(params).then(d=>{
        if(d.data.status==0) {
          wx.hideLoading();
          console.log("触发生成海报");
          that.shengchenghaibao()
        }
    })
  },

  //生成海报的方法
  shengchenghaibao: function (e) {
    var that = this;
    this.setData({
      maskHidden: false
    });
    wx.showToast({
      title: '生成中...',
      icon: 'loading',
      duration: 3000
    });
    setTimeout(function () {
      wx.hideToast()
      that.createNewImg();
      that.setData({
        maskHidden: true
      });
    }, 3000)
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

  },

  //点击保存到相册
  baocun: function () {
    var that = this
    wx.saveImageToPhotosAlbum({
      filePath: that.data.imagePath,
      success(res) {
        wx.showModal({
          content: '图片已保存到相册，赶紧晒一下吧~',
          showCancel: false,
          confirmText: '好的',
          confirmColor: '#333',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
              /* 该隐藏的隐藏 */
              that.setData({
                maskHidden: false
              })
            }
          }, fail: function (res) {
            console.log(11111)
          }
        })
      }
    })
  }




})