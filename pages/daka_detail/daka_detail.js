// pages/user/user.js
const app = getApp()
const filter = require('../../utils/filter');
Page(filter.loginCheck({
  // ...
  onLoad: function (options) {
    // ...
    console.log(app.globalData.testdata)
  },
  // ...
}));