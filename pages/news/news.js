let Api = require("../../wxApi/api.js")
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    secllod: true,
    secllodsd: true,
    categoryId: "",
    currentIndex: 0,
    isImg: true,
    animationRound:""
  },
  isImg() {
    this.setData({
      isImg: false
    })
  },
  //点击导航切换
  ontittext(e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    let categoryId = that.data.itemfx[id].categoryId;
    wx.getStorage({
      key: 'userinfo',
      success: function(res) {
        let a = {
          categoryId: categoryId,
          limit: 9,
          current: 1,
          unionId: res.data.unionid
        }
        Api.newurltitlelist(a).then(res => { //实店新闻案例类型下的列表
          if (res.data.data) {
            that.setData({
              postlist: res.data.data,
              categoryId: that.data.itemfx[id].categoryId,
              isImg: false,
            })
          }
        }, err => {})
      }
    })
    that.setData({
      id: id,
      isImg: true,
    })
  },
  //点击轮播图进详情
  ontapimglist(e) {
    let that = this;
    let postid = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/news/detail/detail?postid=' + postid
    })
  },

  //点击分类下面图片进详情
  ontapdeils(e) {
    let that = this
    let id = e.currentTarget.dataset.id
    let postid = that.data.postlist[id].id;
    wx.navigateTo({
      url: '/pages/news/detail/detail?postid=' + postid
    })
  },
  handleImgChange: function(e) {
    this.setData({
      currentIndex: e.detail.current
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function(res) {
        let a = {
          limit: 10,
          current: 1,
          unionId: res.data.unionid
        }
        Api.newurlimgs(a).then(res => {
          //实店新闻轮播图
          if (res.data.data) {
            that.setData({
              imgUrls: res.data.data,
            })
          }
        }, err => {})
      }
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
  onShow: function() {
    let that = this;
    Api.newurltitle().then(res => { //实店新闻案例类型
      if (res.data.data) {
        that.setData({
          itemfx: res.data.data,
        })
        wx.getStorage({
          key: 'userinfo',
          success: function(res) {
            if (that.data.categoryId=="") {
              let a = {
                categoryId: 0,
                limit: 9,
                current: 1,
                unionId: res.data.unionid
              }
              Api.newurltitlelist(a).then(res => { //实店新闻案例类型下的列表
                if (res.data.data) {
                  that.setData({
                    postlist: res.data.data,
                  })
                } else {
                  that.setData({
                    secllodsd: false
                  })
                }
              }, err => {})
            }
          }
        })
      }
    }, err => {})
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function(res) {
        if (that.data.categoryId == "") {
          let current = 1
          let a = {
            categoryId: 0,
            limit: 10,
            current: current++,
            unionId: res.data.unionid
          }
          Api.newurltitlelist(a).then(res => { //实店新闻案例类型下的列表
            if (res.data.data > 0) {
              that.setData({
                postlist: res.data.data
              })
            } else {
              that.setData({
                secllod: false
              })
            }
          }, err => {})
        } else {
          let current = 1
          let a = {
            categoryId: that.data.categoryId,
            limit: 10,
            current: current++,
            unionId: res.data.unionid
          }
          Api.newurltitlelist(a).then(res => { //实店新闻案例类型下的列表
            if (res.data.data > 0) {
              that.setData({
                postlist: res.data.data
              })
            } else {
              that.setData({
                secllod: false
              })
            }
          }, err => {})
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})