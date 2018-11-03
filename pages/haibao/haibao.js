// pages/haibao/haibao.js
const app = getApp();



Page({

  /**
   * 页面的初始数据
   */
  data: {
     userName:"",
     head_img:"",
     title: "这是需要绘制的文字"
  },
  getUserInfo () {
    let that = this
    app.wechat.getUserInfo().then(res => {
      that.getImageInfo(res.userInfo.avatarUrl)
      that.setData({
         userName: res.userInfo.nickName
      })
    })
  },

  //图片缓存本地的方法
  getImageInfo(url) {
     if(typeof url === 'string') {
         let that = this
         wx.getImageInfo({
            src: url,
            success: function (res) {
              that.setData({
                   head_img: res.path
                })
            },
            fail(err) {
               console.log(err)
            }
         })
     }
  },


  //生成海报
  handlePoster(e) {
    wx.showLoading({
      title: '正在生成...'
    })
    this.huizhicanvas();
    console.log("完成绘制")
  },

  huizhicanvas(){
    const ctx = wx.createCanvasContext('notes');
    ctx.clearRect(0, 0, 0, 0);
    const arr2 = ['../../images/haibao.png', this.data.head_img];    // 有图片海报背景图&&海报正文图片
    const WIDTH = "750";
    const HEIGHT = "1334";
    //  绘制图片模板的 底图
    ctx.drawImage(arr2[0], 0, 0, WIDTH, HEIGHT);

    //绘制海报的正文图片
    ctx.drawImage(arr2[1], "40", "40", "670rpx", "580rpx");

    //绘制头像
    ctx.save();
    let r = "32";
    let d = r * 2;
    let cx = "102";
    let cy = "117";
    ctx.arc(cx + r, cy + r, r, 0, 2 * Math.PI);
    ctx.clip();
    ctx.drawImage(this.data.head_img, cx, cy, d, d);
    
    ctx.restore();
    
   //绘制正文和 出处
    const CONTENT_ROW_LENGTH = "40rpx";  // 正文 单行显示字符长度
    let [contentLeng, contentArray, contentRows] = this.textByteLength(this.data.title, CONTENT_ROW_LENGTH);
    ctx.setTextAlign('left')
    ctx.setFontSize("32rpx");
    let contentHh = "32rpx" * 1.3;
    for (let m = 0; m < contentArray.length; m++) {
      ctx.fillText(contentArray[m], "40rpx", "732rpx" + contentHh * m);
       
    }
    //  绘制 出处
    ctx.setTextAlign('right')
    ctx.setFontSize("32rpx");
    ctx.fillText(`——${this.data.title}`, "710rpx", "996rpx", "710rpx");


    //绘制二维码右边的说明
    ctx.setTextAlign('left')
    ctx.setFontSize("28rpx");
    ctx.setFillStyle('rgba(34,34,34,.64)')
    ctx.fillText('长按小程序码', "250rpx", "1174rpx");
    ctx.fillText(`${this.data.userName}邀你进入掌阅读好书`, "250", "670");
    ctx.draw();


    setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'notes',
        fileType: 'jpg',
        success: function (res) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(res) {
              wx.hideLoading();
              wx.showToast({
                title: '保存成功',
              });
            },
            fail() {
              wx.hideLoading()
            }
          })
        }
      })
    }, 500);
    
     
  },


  textByteLength(text, num) {  // text为传入的文本  num为单行显示的字节长度
    let strLength = 0; // text byte length
    let rows = 1;
    let str = 0;
    let arr = [];
    for (let j = 0; j < text.length; j++) {
      if (text.charCodeAt(j) > 255) {
        strLength += 2;
        if (strLength > rows * num) {
          strLength++;
          arr.push(text.slice(str, j));
          str = j;
          rows++;
        }
      } else {
        strLength++;
        if (strLength > rows * num) {
          arr.push(text.slice(str, j));
          str = j;
          rows++;
        }
      }
    }
    arr.push(text.slice(str, text.length));
    return [strLength, arr, rows]   //  [处理文字的总字节长度，每行显示内容的数组，行数]
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    
    // app.wechat.login().then( res => {
    //    if (res.code) {
    //       console.log("登录成功")
    //    }
    // })
    // app.wechat.getUserInfo().then( res =>{
    //     console.log(res)
    // })
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