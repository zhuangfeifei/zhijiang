// pages/boutique/boutique.js
let Api = require("../../wxApi/api.js")
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    posid: '',
    post_id: "",
    list: [],
    setonll: false,
    imglist: [
      "/images/home/ab.png",
      "/images/home/ac.png",
      "/images/home/ad.png",
      "/images/home/ae.png"
    ],
    catspoid: [74, 75, 76, 77],
    index_active: 0,
    isImg: true,
    animationRound:""
  },
  isImg() {
    this.setData({
      isImg: false
    })
  },
  //头部导航点击事件
  ontittext(e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    that.setData({
      index_active: index
    })
    wx.getStorage({
      key: 'userinfo',
      success: function(res) {
        let a = {
          categoryId: that.data.catspoid[index],
          unionId: res.data.unionid,
        }
        Api.categoryBoutique(a).then(res => {
          let lists = that.botuontap(res.data.data)
          that.setData({
            oncondet: res.data.data,
            list: lists
          })
          app.store.setState({
            piclist: res.data.data
          })
        }, err => {})
      },
    })

    that.setData({
      posid: e.currentTarget.dataset.index,
      posids: that.data.optext[index].ID,
      isImg: true
    })
  },

  //婚纱点击列表
  bintapdeil(e) {
    let that = this
    let id = e.currentTarget.dataset.id;
    let active = that.data.index_active
    wx.navigateTo({
      url: '/pages/boutique/detil/detil?index=' + id + '&active=' + active
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    //获取大类
    Api.category().then(res => {
      if (res.data.data) {
        that.setData({
          optext: res.data.data,
          post_id: res.data.data[0].ID
        })
      }
      if (that.data.posid == "") {
        wx.getStorage({
          key: 'userinfo',
          success: function(res) {
            let a = {
              unionId: res.data.unionid,
              categoryId: that.data.post_id
            }

            let unionId = res.data.unionid
            //获取小类下的图片
            Api.categoryBoutique(a).then(res => {
              let lists = that.botuontap(res.data.data)
              that.setData({
                oncondet: res.data.data,
                list: lists
              })
              app.store.setState({
                piclist: res.data.data
              })
            }, err => {})
          },
        })
      } else {
        wx.getStorage({
          key: 'userinfo',
          success: function(res) {
            let a = {
              unionId: res.data.unionid,
              categoryId: that.data.posid
            }
            //获取小类下的图片
            Api.categoryBoutique(a).then(res => {
              let lists = that.botuontap(res.data.data)
              that.setData({
                oncondet: res.data.data,
                list: lists
              })
            }, err => {})
          },
        })
      }
    }, err => {})
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
  
  },
  //获取clothList下的pic的图片集合重写postlist
  botuontap(e) {
    let lists = [];
    for (let val of e) {
      if (val.clothList[0].thumbnail_pic) {
        if (typeof val.clothList == Array) {
          val.clothList[0].pic = val.clothList[0].thumbnail_pic.split(',')
          if (val.clothList[0].thumbnail_pic.length > 4) {
            val.clothList[0].pic = val.clothList[0].thumbnail_pic.substring(0, 4)
          }
        }
      }
      lists.push({
        categoryName: val.categoryName,
        clothList: val.clothList
      })
    }
    return lists
  },
  //婚纱详情
  ondetails(e) {
    let that = this;
    let postid = e.currentTarget.dataset.id;
    let title = e.currentTarget.dataset.name
    let iscollotion = e.currentTarget.dataset.num;
    wx.navigateTo({
      url: '/pages/index/wedding_details/wedding_details?postid=' + postid + '&title=' + title + '&iscollotion=' + iscollotion,
    })
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
  onReachBottom(e) {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})