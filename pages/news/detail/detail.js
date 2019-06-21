let Api = require("../../../wxApi/api.js")
var WxParse = require('../../../wxParse/wxParse.js');
let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    iscollotion: 0,
    postid: "",
    pic:'',
    isImg: true,
    animationRound:""
  },
  isImg() {
    this.setData({
      isImg: false
    })
  },

  //点击分享
  onbjtappay(e) {
    let that = this
    let pic = that.data.pic
    let thme = that.data.thme
    let id = 0;
    wx.navigateTo({
      url: '/pages/index/wedding_details/onpaydet/onpaydet?pic=' + pic + '&thme=' + thme + '&id=' + id,
    })
  },

  //点赞
  onclickon(e) {
    let that = this;
    let iscollotion = that.data.iscollotion
    if (iscollotion == 0) {
      wx.getStorage({
        key: 'userinfo',
        success: function(res) {
          let unionId = res.data.unionid;
          let postid = that.data.postid
          let a = {
            caseId: postid,
            unionId: unionId
          }
          //点赞
          Api.newlisttclick(a).then(res => {
            wx.showToast({
              title: '点赞成功',
            })
          }, err => {})
        }
      });
    } else {
      wx.getStorage({
        key: 'userinfo',
        success: function(res) {
          let unionId = res.data.unionid;
          let postid = that.data.postid
          let a = {
            caseId: postid,
            unionId: unionId
          }
          //取消点赞
          Api.onslisttclick(a).then(res => {
            wx.showToast({
              title: '取消点赞',
            })
          }, err => {})
        }
      })
    }
    that.setData({
      iscollotion: !iscollotion
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function(res) {
        let postids = Number(options.postid)
        let a = {
          caseId: postids,
          unionId: res.data.unionid
        }
        // 获取案例详情
        Api.newlistt(a).then(res => {
          if (res.data.data&&res.data.data.pic) {
            that.setData({
              pic: res.data.data.pic,
              thme: res.data.data.theme,
              caseName: res.data.data.caseName,
              data_source: res.data.data.data_source,
              postid: options.postid,
              iscollotion: res.data.data.iscollotion
            })
            if (res.data.data.headicon && res.data.data.nickname) {
              that.setData({
                headicon: res.data.data.headicon,
                nickname: res.data.data.nickname,
              })
            }
            let content = res.data.data.content
            let love = content
            WxParse.wxParse('article', 'html', love, that, 5);
          }
        }, err => {})
      }
    })
    let postid = options.postid;
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
  onShow: function() {},

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})