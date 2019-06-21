// pages/index/wedding_details/wedding_details.js
let Api = require("../../../wxApi/api.js")
var WxParse = require('../../../wxParse/wxParse.js');
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postid: "",
    iphone: "4001585518",
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    id: "",
    isAppoint:'',
    isImg: true,
    animationRound:"",
  },
  isImg() {
    this.setData({
      isImg: false
    })
  },
  //收藏
  selectList(e) {
    let that = this
    let iscollotion = that.data.iscollotion;
    if (iscollotion == 0) {
      wx.getStorage({
        key: 'userinfo',
        success: function (res) {
          let unionId = res.data.unionid;
          let postid = that.data.postid
          let a = {
            unionId: unionId,
            clothId: postid
          }
          Api.onclickcllon(a).then(res => {
            that.setData({
              iscollotion: 1
            })
            wx.showToast({
              title: '收藏成功',
            }, 200)
          }, err => { })
        },
      })
    } else {
      wx.getStorage({
        key: 'userinfo',
        success: function (res) {
          let unionId = res.data.unionid;
          let postid = that.data.postid
          let a = {
            unionId: unionId,
            clothIds: postid
          }
          //取消收藏
          Api.onclickcllonun(a).then(res => {
            wx.showToast({
              title: '取消收藏',
            }, 200)
          }, err => { })
        },
      })
    }
    that.setData({
      iscollotion: !iscollotion
    })
  },
  //立即预约
  routerUrl(e){
    this.goAnyWhere(e)
  },
  //点击拨打电话
  onipnone(e) {
    let that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.iphone,
      success(res) { }
    })
  },
  //分享
  ontappays(e) {
    let that = this;
    let pic = that.data.imglist[0];
    let thme = that.data.postlist.goods_specif;
    let id = 1;
    wx.navigateTo({
      url: '/pages/index/wedding_details/onpaydet/onpaydet?pic=' + pic + '&thme=' + thme + '&id=' + id
    })
  },
  //全部商品
  bitaplist(e) {
    let that = this
    wx.switchTab({
      url: '/pages/boutique/boutique',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let postid = options.postid;
    let title = options.title;
    let iscollotion = options.iscollotion
    let imglist = [];
    let arry = [];
    let a = {
      clothId: postid
    }
    wx.setNavigationBarTitle({
      title: title,
    })

    //婚纱详情
    Api.categorydetil(a).then(res => {
      if (res.data.data) {
        let list = res.data.data.goods_pic.split(',');
        let doos_name = res.data.data.goods_specif;
        let inventory = res.data.data.inventory;
        let description = res.data.data.description;
        let label = res.data.data.goods_label
        for (let i = 0; i < label.length; i++) {
          let obj = {};
          obj.list = label[i]
          arry.push(obj)
        }
        that.setData({
          imglist: list,
          postlist: res.data.data,
          doos_name: res.data.data.goods_specif,
          inventory: res.data.data.inventory,
          arry: arry,
          postid: options.postid,
          iscollotion: options.iscollotion
        })
        let love = description
        WxParse.wxParse('article', 'html', love, that, 5);
      }
    }, err => { })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
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