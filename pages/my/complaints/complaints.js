// pages/my/complaints/complaints.js
const Api = require('../../../wxApi/api')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    changeTextarea:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  changeTextarea(e){
    this.setData({
      changeTextarea: e.detail.value
    })
  },
  addCs(){
    Api.addCs({ title:'1', reason:this.data.changeTextarea, unionId: app.store.$state.userinfo.unionid }).then(res=>{
      // console.log(res.data)
      if(res.data.code == 200 ){
        wx.showToast({
          title: '投诉成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(()=>{
          wx.navigateBack();
        },2000)
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