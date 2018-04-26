//获取应用实例
const app = getApp()

// pages/News/News.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsnum: 5,
    newsMenuList: {},
    newsList: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //?channel=头条&num=2&start=0&appkey=5d5d7cc22129bfda94bed8a43e956b6c
    var URL = app.globalData.jdwayBase + 'channel?appkey=' + app.globalData.jdwayAppkey;
    this.getNewsMenuData(URL);
    this.newsNavClick();
  },

  /** 获取新闻列表 */
  getNewsMenuData: function (url) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    });
    
    // 请求新闻数据
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
        var data = res.data.result;
        var news = [];
        for (let idx in data.result) {
          var temp = {
            id: idx,
            name: data.result[idx]
          }
          news.push(temp);
        }

        this.setData({ newsMenuList: news });
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

  newsNavClick:function(e) {
    var name='';
    name = (e && e.currentTarget.dataset.name) ? e.currentTarget.dataset.name : "头条";
    var url = app.globalData.jdwayBase + 'get?channel=' + name + '&num=10&start=0&appkey='+app.globalData.jdwayAppkey;
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
        var data = res.data.result;
        that.processNewsListData(data.result);
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

  /** 组装新闻数据 */
  processNewsListData: function (data) {
    var news = [];
    for (let idx in data.list) {
      var subject = data.list[idx]; 
      var content = subject.content.split('<p')[1].replace('</p>', '');
      var p = (content.indexOf(">") >= 0) ? content.indexOf('>') : -1;
      content=content.substring(p+1,content.length);
      var temp = {
        id: idx,
        title: subject.title,
        time: subject.time,
        src: subject.src,
        category: subject.category,
        pic: subject.pic,
        content: content.replace(/\&nbsp;/g, '').trim(),
        url: subject.url,
        weburl: subject.weburl
      }
      news.push(temp);
    }

    this.setData({ newsList: news });
  },

  newsClick: function (e) {
    //dataset内包含data-*的数据
    var dataset = e.currentTarget.dataset;
    wx.navigateTo({
      url: "News-detail/News-detail?flag=newsdetail&newsurl="+dataset.nsource
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