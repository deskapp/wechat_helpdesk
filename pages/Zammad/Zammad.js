//获取应用实例
const app = getApp()

// pages/Zammad/Zammad.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: 'Welcome to Zammad',
    location: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    this.setData({
      location: app.globalData.location
    })

    //this.loadWeather(this.data.location);
  },

  //自定义获取天气

  loadWeather: function (city) {
    var page = this;
    wx.request({
      //url: 'http://wthrcdn.etouch.cn/weather_mini?city=' + city,
      header: {
        'content-type': 'application/json'
      },

      success: function (res) {
        console.log(res);
        var future = res.data.data.forecast;
        var todayInfo = future.shift();
        var today = res.data.data;
        today.todayInfo = todayInfo;
        page.setData({
          today: today,
          future: future,
        });
      }
    })
  },

  submitIssue: function(){
    console.info("Submit Issue!")
  }
})