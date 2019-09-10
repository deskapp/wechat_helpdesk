//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    //获取当前位置
    // 引入SDK核心类
    var QQMapWX = require('./lib/qqmap-wx-jssdk.js');

    // 实例化API核心类
    var loct = new QQMapWX({
      key: 'ACWBZ-B6GKK-FHQJW-A7V5D-DOBV3-LXFBD' // 必填
    });

    wx.getLocation({
      type: 'wgs84',
      success: res => {
        // 调用接口
        loct.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: addressRes => {
            //var address = addressRes.result.formatted_addresses.recommend;
            var address = addressRes.result.address_component.city;
            console.log(address);
            this.globalData.location = address;
          },
          fail: function (addressRes) {
            console.log("Falled to get address!");
          }
        })
      }
    })
  },

  globalData: {
    userInfo: null,
    location: "",
    doubanBase: "https://api.douban.com/",
    jdwayBase: "https://way.jd.com/jisuapi/",
    zammadBase: "https://u.zammad.com.cn/",
    jdwayAppkey: "5d5d7cc22129bfda94bed8a43e956b6c"
  }
})
