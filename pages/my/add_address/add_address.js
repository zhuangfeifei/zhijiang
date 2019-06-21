// pages/my/add_address/add_address.js
const Api = require('../../../wxApi/api.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customItem: '全部',
    list:{
      name: '', phone:'', region: [], detail:''
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.value){
      this.setData({
        list: JSON.parse(options.value)
      })
    }
  },
  nameChange(e){
    this.setData({
      'list.name': e.detail.value
    })
  },
  phoneChange(e){
    this.setData({
      'list.phone': e.detail.value
    })
  },
  bindRegionChange(e) {
    this.setData({
      'list.region': e.detail.value
    })
  },
  detailChange(e){
    this.setData({
      'list.detail': e.detail.value
    })
  },
  addadress(){
    let list = this.data.list
    let value = { 
      shipName: list.name, phoneNum: list.phone, province: list.region[0], city: list.region[1], area: list.region[2], 
      address: list.detail, isdefault: 1, unionId: app.store.$state.userinfo.unionid
    }
    if(list.id){
      value.id = list.id
      Api.updateadress(value).then(res=>{
        // console.log(res.data)
        if(res.data.code == 200){
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(()=>{
            wx.navigateBack();
          },2000)
        }
      },err=>{
  
      })
    }else{
      Api.addadress(value).then(res=>{
        // console.log(res.data)
        if(res.data.code == 200){
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(()=>{
            wx.navigateBack();
          },2000)
        }
      },err=>{
  
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