// pages/my/address/address.js
const Api = require('../../../wxApi/api.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // list:[],
    screenHeight:'',
    listadress:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let screenHeight = wx.getSystemInfoSync().windowHeight
    this.setData({ screenHeight: screenHeight - this.px(98) })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  routerUrl(e) {
    this.goAnyWhere(e)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    Api.listadress({ unionId: app.store.$state.userinfo.unionid, limit: 10, current: 1 }).then(res=>{
      // console.log(res.data)
      if(res.data.code == 200){
        this.setData({
          listadress: res.data.data
        })
      }
    },err=>{

    })
  },
  defaultById(e){
    Api.defaultById({ unionId: app.store.$state.userinfo.unionid, id: e.currentTarget.dataset.id }).then(res=>{
      // console.log(res.data)
      if(res.data.code == 200){
        this.onShow()
        wx.showToast({
          title: '设置成功',
          icon: 'success',
          duration: 2000
        });
      }
    },err=>{

    })
  },
  deladress(e){
    wx.showModal({
      title: '温馨提示',
      content: '确认删除吗？',
      success(res) {
        if (res.confirm) {
          Api.deladress({ unionId: app.store.$state.userinfo.unionid, id: e.currentTarget.dataset.id }).then(res=>{
            // console.log(res.data)
            if(res.data.code == 200){
              this.onShow()
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 2000
              });
            }
          },err=>{
      
          })
        } else if (res.cancel) {
          
        }
      }
    })
  },
  updateadress(e){
    let list = e.currentTarget.dataset.data
    let value = {
      name: list.ship_name, phone: list.phone_num, region: [ list.province, list.city, list.area ], detail: list.address, id: list.id
    }
    wx.navigateTo({
      url: '/pages/my/add_address/add_address?value=' + JSON.stringify(value),
    });
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