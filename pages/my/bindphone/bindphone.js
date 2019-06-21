// pages/my/bindphone/bindphone.js
const Api = require('../../../wxApi/api.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'', code:'', time: 120, isCode: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  phone(e){
    this.setData({
      phone: e.detail.value
    })
  },
  code(e){
    this.setData({
      code: e.detail.value
    })
  },
  getCode(){
    if(this.data.isCode && this.data.phone){
      this.setData({
        isCode: false
      })
      Api.code({ phone: this.data.phone, msgType: 1 }).then(res=>{
        // console.log(res.data)
        if(res.data.code == 200){
          wx.showToast({
            title: '发送成功',
            icon: 'success',
            duration: 2000
          })
          let isTime = setInterval(()=>{
            this.setData({
              time: this.data.time - 1
            })
            if(this.data.time == 0) {
              clearInterval(isTime)
              this.setData({
                isCode: true,
                time: 120
              })
            }
          },1000)
        }
      })
    }
  },
  bindPhone(){
    if(this.data.phone && this.data.code){
      Api.phoneNew({ phone: this.data.phone, vcode: this.data.code, unionId: app.store.$state.userinfo.unionid }).then(res=>{
        // console.log(res.data)
        if(res.data.code == 200){
          wx.showToast({
            title: '绑定成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(()=>{
            wx.navigateBack()
          },2000)
        }
      })
    }
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