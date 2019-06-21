const Api = require('../../../wxApi/api.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tomaks: 0,
    statuss: 1,
    getAppoint: ''
  },
  //导航
  toaddres(e) {
    wx.getLocation({ //获取当前经纬度
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度，官方提示bug: iOS 6.3.30 type 参数不生效，只会返回 wgs84 类型的坐标信息  
      success: function (res) {
        wx.openLocation({ //​使用微信内置地图查看位置。
          latitude: 31.3741210000, //要去的纬度
          longitude: 120.6296690000, //要去的经度
          name: "迈家众创",
          address: '华元路方圆里商业广场迈家众创'
        })
      }
    })
  },
  untomaskme(e) {
    wx.navigateTo({
      url: '/pages/boutique/untomake/untomake?id=' + this.data.getAppoint.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    Api.getAppoint({ unionId: app.store.$state.userinfo.unionid }).then(res=>{
      // console.log(res.data)
      if(res.data.code == 200){
        this.setData({
          getAppoint: res.data.data
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
  onShareAppMessage: function () {

  }
})