// pages/prize/prize.js
const util = require ('../../utils/util');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // img: "../../images/cuotiji@2x.png",
    // wechat: ".../../images/cuotiji@2x.png",
    // quan: "../../images/cuotiji@2x.png",
    code: "E7AI98",
    inputValue: "",
    maskHidden: false,
    name: "",
    touxiang: "",
    code: "E7A93C"
  },
  //获取输入框的值
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  //点击提交按钮
  btnclick: function () {
    var text = this.data.inputValue
    wx.showToast({
      title: text,
      icon: 'none',
      duration: 2000
    })
  },

  getUserInfo() {
    let that = this
    app.wechat.getUserInfo().then(res => {
      that.getImageInfo(res.userInfo.avatarUrl)
      that.setData({
        name: res.userInfo.nickName,
      });
      
    })
  },
  //图片缓存本地的方法
  getImageInfo(url) {
    if (typeof url === 'string') {
      let that = this
      wx.getImageInfo({
        src: url,
        success: function (res) {
          that.setData({
            touxiang: res.path
          })
        },
        fail(err) {
          console.log(err)
        }
      })
    }
  },
  onGotUserInfo: function(e){
    let that = this;
    that.getImageInfo(e.detail.userInfo.avatarUrl)
    that.setData({
      name: e.detail.userInfo.nickName,
    });
    that.formSubmit();

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    

  },
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
    var path1 = that.data.touxiang;
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
    var name = that.data.name;
    //绘制名字
    context.setFontSize(24);
    context.setFillStyle('#333333');
    context.setTextAlign('center');
    context.fillText(name, 66, 570);
    context.stroke();
    
    context.beginPath();
    var text = '似乎大家都是这样自命不凡，却无足轻重';
    var chr = text.split("");
    var temp ="";
    var row = [];
    context.setFontSize(30);
    context.setFillStyle("#fff");
    context.setTextAlign('center');
    for (var a = 0; a< chr.length; a++) {
       if (context.measureText(temp).width < 250 ){
           temp += chr[a];
       }else {
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
   
    context.moveTo(150,300);
    context.lineTo(200,300);
    context.setStrokeStyle('white');
    context.stroke();
    
    context.setFontSize(30);
    context.setFillStyle('white');
    context.setTextAlign('center');
    context.fillText("环形使者", 185, 350,100);
    context.stroke();

    var timeunix = 1540967068;
    var timestr = util.formatTime(timeunix,'Y-M-D');
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
    context.fillText("【国考】5天言语挑战营", 35, 600);
    context.stroke();
    
    context.setFontSize(18);
    context.setFillStyle('#333');
    context.setTextAlign('left');
    context.fillText("第2/5课打卡", 35, 630);
    context.stroke();
    
    context.drawImage("../../images/test.png", 260, 530, 100, 100); // 在刚刚裁剪的园上画图
    context.draw();
    //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
    setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'mycanvas',
        success: function (res) {
          var tempFilePath = res.tempFilePath;
          that.setData({
            imagePath: tempFilePath,
            canvasHidden: true
          });
        },
        fail: function (res) {
          console.log(res);
        }
      });
    }, 300);
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
  },
  //点击生成
  formSubmit: function (e) {
    var that = this;
    this.setData({
      maskHidden: false
    });
    wx.showToast({
      title: '生成中...',
      icon: 'loading',
      duration: 1000
    });
    setTimeout(function () {
      wx.hideToast()
      that.createNewImg();
      that.setData({
        maskHidden: true
      });
    }, 1000)
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
    var that = this;
    wx.getUserInfo({
      success: res => {
        console.log(res.userInfo, "huoqudao le ")
        this.setData({
          name: res.userInfo.nickName,
        })
        wx.downloadFile({
          url: res.userInfo.avatarUrl, //仅为示例，并非真实的资源
          success: function (res) {
            // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
            if (res.statusCode === 200) {
              console.log(res, "reererererer")
              that.setData({
                touxiang: res.tempFilePath
              })
            }
          }
        })
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
  onShareAppMessage: function (res) {
    return {
      title: "这个是我分享出来的东西",
      success: function (res) {
        console.log(res, "转发成功")
      },
      fail: function (res) {
        console.log(res, "转发失败")
      }
    }
  }
})