// pages/my/complaints_list/complaints_list.js
const Api = require('../../../wxApi/api')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myCs:'',
    screenHeight:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let screenHeight = wx.getSystemInfoSync().windowHeight
    this.setData({ screenHeight: screenHeight - this.px(98) })
  },
  routerUrl(e) {
    this.goAnyWhere(e)
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
    this.getmyCs()
  },
  getmyCs(){
    Api.myCs({ unionId: app.store.$state.userinfo.unionid, limit: 100, current: 1 }).then(res=>{
      // console.log(res.data)
      if(res.data.code == 200 ){
        this.setData({
          myCs: res.data.data
        })
      }
    })
  },
  cancel(e){
    let that = this
    wx.showModal({
      title: '温馨提示',
      content: '确定取消',
      success(res) {
        if (res.confirm) {
          Api.delCs({ csId: e.currentTarget.dataset.id }).then(res=>{
            // console.log(res.data)
            if(res.data.code == 200 ){
              that.getmyCs()
              wx.showToast({
                title: '取消成功',
                icon: 'success',
                duration: 2000
              })
            }
          })
        } else if (res.cancel) {
        }
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