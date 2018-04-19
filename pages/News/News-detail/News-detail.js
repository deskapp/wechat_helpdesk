var WxParse = require('../../../wxParse/wxParse.js');

// pages/News/News-detail/News-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    NewsData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var url = options.newsurl;
    url = url.replace("http","https");
    var that = this;
    wx.request({
      url: url,
      data: {
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "content-type": "application/json; charset=utf-8"
      }, // 设置请求的 header
      success: res => {
        // 组装新闻数据
        var data = res.data;
        //this.setData({ NewsData: data });
        var p1 = data.indexOf('<head>');
        var p2 = data.indexOf('<body');
        var p3 = data.indexOf('</article>');
        var p4 = data.indexOf('</main>');
        var newsdata = data.substring(0, p1) + data.substring(p2, p3 + 10) + data.substring(p4,data.length);
        while ((p1=newsdata.indexOf('<script'))>0)
        {
          p2 = newsdata.indexOf('</script>',p1);
          newsdata = newsdata.substring(0, p1) + newsdata.substring(p2 + 9, newsdata.length);
        }
        
        WxParse.wxParse('article', 'html', newsdata, that, 5);
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
        wx.hideToast();
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