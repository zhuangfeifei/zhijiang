// pages/my/my.js
const Api = require('../../wxApi/api.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    promotionList:'',
    isAppoint: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(app.store.$state.userinfo)
    wx.login({
      success: res_login=> {
        if (res_login.code) {
          wx.getSetting({
            success: res =>{
              if (res.authSetting['scope.userInfo']) {
                this.getUserInfo(res_login)
              }
            }
          })
        }
      }
    })
  },
  // 商品详情
  goodsListDetails(e){
    let details = e.currentTarget.dataset.data
    wx.navigateTo({
      url: `/pages/index/wedding_details/wedding_details?postid=${details.id}&title=${details.goods_name}&iscollotion=${details.iscollotion}`
    })
  },
  routerUrl(e){
    this.goAnyWhere(e)
  },
  promotionListDetails(e) {
    app.store.setState({
      promotionListDetails: e.currentTarget.dataset.data
    })
    wx.navigateTo({
      url: '/pages/my/details/details',
    });
  },
  // 根据会员等级加载推荐列表
  promotionList(){
    Api.promotionList({ unionId: app.store.$state.userinfo.unionid }).then(res=>{
      if(res.data.code == 200){
        this.setData({
          promotionList: res.data.data.length > 0 && res.data.data[0].categoryList ? this.changeData(res.data.data) : res.data.data
        })
      }
    },err=>{

    })
  },
  changeData(data){
    let arr = []
    for(let val of data){
      val.pic = val.tiny_pic.split(',')
      for(let s of val.categoryList){
        s.pic = s.tiny_pic.split(',')
      }
      arr.push(val)
    }
    return arr
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
    this.setData({
      isAppoint: wx.getStorageSync('isAppoint')
    })
    this.promotionList()
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