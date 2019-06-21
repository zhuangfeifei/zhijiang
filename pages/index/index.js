let Api = require("../../wxApi/api.js")
const ImgLoader = require('../../img-loader/img-loader.js')
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 1,
    secllod: true,
    indicatorDots: true,
    autoplayad: true,
    interval: 2000,
    duration: 1000,
    isShow: true,
    autoplay: false,
    videoContext: '',
    hiden: false,
    isImg: true,
    animationRound: "",
    imgUrlsPic: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  isImg() {
    this.setData({
      isImg: false
    })
  },
  //轮播图详情
  ontapdetail(e) {
    let that = this
    let id = e.currentTarget.dataset.id;
    let img = that.data.imgUrls[id].imgs;
    wx.navigateTo({
      url: '/pages/index/swiper/swiper?img=' + img,
    })
  },
  //加盟方案
  tapjion(e) {
    wx.navigateTo({
      url: '/pages/index/join/join',
    })
  },

  //婚纱详情
  onwedtap(e) {
    let that = this;
    let id = e.currentTarget.dataset.id
    let postid = that.data.postlist[id].id
    let iscollotion = that.data.postlist[id].iscollotion
    let title = that.data.postlist[id].goods_name;
    wx.navigateTo({
      url: '/pages/index/wedding_details/wedding_details?postid=' + postid +
        '&title=' + title + '&iscollotion=' + iscollotion,
    })
  },
  onLoad: function (options) {
    // console.log(app.store.$state.imgUrlotler)

    this.imgLoader = new ImgLoader(this)//初始化预加载
    wx.setStorageSync('isPermissions', 1); // 取消弹窗
    this.oncllonclic();
    this.onshowlist()
  },
  //获取轮播图
  onshowlist() {
    Api.imgarrlist().then(res => {
      if (res.data.data.length>0) {
        let imgUrls = []
        for(let i in res.data.data){
          let pic = res.data.data[i].pic;
          imgUrls.push(pic)
        }
        this.imgLoader.load(app.store.$state.imgUrlotler + imgUrls[0], () => {
          this.setData({
            imgUrls,
            imgUrlsPic:imgUrls[0]
          })
        })
      }
    }, err => { }) 
  },

  //精品婚纱展示
  oncllonclic() {
    let that = this
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        let a = {
          limit: 10,
          current: 1,
          unionId: res.data.unionid
        }
        Api.categorylist(a).then(res => {
          if (res.data.data) {
            that.setData({
              postlist: res.data.data,
            })
          }
        }, err => { })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    this.animationRound()
  },
  autoplays() {
    this.setData({
      hiden: true
    })
    setTimeout(() => {
      var a = wx.createVideoContext('myAudio')
      a.play()
    }, 400)
  },
  animationRound() { //加载更多动画
    const animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear',
    })

    var n = 0;
    setInterval(() => {
      n = n + 1;
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
    let that = this
    this.oncllonclic();
    app.store.setState({
      userinfo: wx.getStorageSync('userinfo')
    })
  },

  // // 是否权限弹窗
  permissions_clear() {
    if (app.store.$state.userinfo.authstatus == 1) {
      wx.setStorageSync('isPermissions', 1);
      app.store.setState({
        isPermissions: wx.getStorageSync('isPermissions')
      })
    }
    this.setData({
      isShow: false
    })
  },
  routerUrl(e) {
    this.goAnyWhere(e)
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
  onReachBottom: function (e) {
    let that = this
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        let a = {
          limit: 10,
          current: that.data.current++,
          unionId: res.data.unionid
        }
        Api.categorylist(a).then(res => {
          if (res.data.data.length!=0) {
            that.setData({
              postlist: res.data.data,
              secllod: true
            })
          } else {
            that.setData({
              secllod: false
            })
          }
        }, err => { })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})