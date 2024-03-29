// pages/boutique/untomake/untomake.js
const Api = require('../../../wxApi/api.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:''
  },

  bindFormSubmit(e) {
    let that = this
    let textarea = e.detail.value.textarea
    Api.editAppoint({ appointId: this.data.id, reason: textarea }).then(res=>{
      // console.log(res.data)
      if(res.data.code == 200){
        wx.setStorageSync('isAppoint', 0)
        app.store.setState({
          isAppoint: wx.getStorageSync('isAppoint')
        })
        wx.showToast({
          title: '取消成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(()=>{
          wx.switchTab({
            url: '/pages/my/my',
          })
        },2000)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.setData({
      id: options.id
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