// pages/my/details/details.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabindex: 0,
    imgIndex: 0,
    animationHeight:'',
    animationHeights:'',
    isIndex: true, timesIndex: 1,
    isAppoint: '',
    isImg: true,
    animationRound:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  isImg(){
    this.setData({
      isImg: false
    })
  },
  tabChange(e){
    this.setData({
      tabindex: e.currentTarget.dataset.index,
      isImg: true
    })
  },
  routerUrl(e){
    wx.switchTab({
      url: e.currentTarget.dataset.url
    })
  },
  callPhone(){
    wx.makePhoneCall({
      phoneNumber: '4001585518' // 仅为示例，并非真实的电话号码
    })
  },
  routerUrl(e){
    this.goAnyWhere(e)
  },
  // swiperChange(e){
  //   let a = this.data.timesIndex
  //   this.setData({
  //     imgIndex: e.detail.current,
  //     timesIndex: this.data.timesIndex + 1,
  //     isIndex: a > app.store.$state.promotionListDetails.pic.lenght ? false : true
  //   })
  //   this.animationHeight()
  // },
  // animationHeight() {
  //   const animationHeight = wx.createAnimation({
  //     duration: 500,
  //     timingFunction: 'ease',
  //   })
  //   const animationHeights = wx.createAnimation({
  //     duration: 500,
  //     timingFunction: 'ease',
  //   })

  //   animationHeight.height(this.px(670)).step({ duration: 500 })
  //   animationHeights.height(this.px(511)).step({ duration: 500 })

  //   this.setData({
  //     animationHeight: animationHeight.export(),
  //     animationHeights: animationHeights.export(),
  //   })
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.animationHeight()
    this.animationRound()
  },
  animationRound(){ //加载更多动画
    const animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear',
    })

    var n = 0;
    setInterval(()=>{
      n=n+1;
      animation.rotate(180 * (n)).step()
      this.setData({
        animationRound: animation.export()
      })
    }, 500)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      isAppoint: wx.getStorageSync('isAppoint')
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