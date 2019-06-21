// pages/boutique/detil/detil.js
let Api = require("../../../wxApi/api.js")
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    secllod: true,
    postid: "",
    listid: "",
    indexasd: 0,
    catspoid: [74, 75, 76, 77],
    active:"",
    isImg: true,
    animationRound:""
  },
  isImg() {
    this.setData({
      isImg: false
    })
  },
  //商品详情
  ontapdetils(e) {
    let that = this
    let id = e.currentTarget.dataset.id;
    let iscollotion = that.data.polists[that.data.indexasd].clothList[id].iscollotion
    let postid = that.data.polists[that.data.indexasd].clothList[id].id;
    let title = that.data.polists[that.data.indexasd].clothList[id].goods_name;
    if (title.length > 11) {
      title = title.substring(0, 9)
      wx.navigateTo({
        url: '/pages/index/wedding_details/wedding_details?postid=' + postid + '&title=' + title + '&iscollotion=' + iscollotion,
      })
    } else {
      wx.navigateTo({
        url: '/pages/index/wedding_details/wedding_details?postid=' + postid + '&id=' + id + '&title=' + title + '&iscollotion=' + iscollotion,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(app.store.$state.piclist)
    let that = this
    that.setData({
      polists: app.store.$state.piclist,
      indexasd: parseInt(options.index),
      active:options.active
    })
    wx.setNavigationBarTitle({
      title: app.store.$state.piclist[parseInt(options.index)].categoryName,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
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
    let that = this
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        let a = {
          unionId: res.data.unionid,
          categoryId: that.data.catspoid[that.data.active]
        }
        //获取小类下的图片
        Api.categoryBoutique(a).then(res => {
          // let polist = [];
          // for (let i in res.data.data) {
          //   let list = res.data.data[i];
          //   polist.push(list)
          // }
          app.store.setState({
            piclist: res.data.data
          })
        }, err => { })
      },
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
    let that = this;
    let listid = that.data.listid;
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        let a = {
          unionId: res.data.unionid,
          categoryId: that.data.postid
        }
        Api.categoryBoutique(a).then(res => {
          if (res.data.data>0) {
            let list = res.data.data[listid].clothList;
            piclist.push(list)
            let img = res.data.data[listid].clothList[listid].thumbnail_pic.split(',');
            that.setData({
              piclist,
              imgs: img,
              postid: options.postid,
              listid: options.id,
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