/**
 * 1. 引入store
 */
const Store = require('./store.js');
const Api = require('../wxApi/api.js');
/**
 * 2. 实例化一个Store，且允许初始化一个全局状态
 */
module.exports = new Store({
  state: {
    //以下为自定义的全局状态，用法和页面中的data: {...} 一致。
    url: Api.imgUrls, // 服务器图片
    imgUrl: Api.imgUrl + '/business/gallery/', // 精品区
    imgUrlotler: Api.imgUrl + '/business/',  // 普通图片
    imgad:Api.imgUrls + '/static/images/',   // 服务器图片
    userinfo: wx.getStorageSync('userinfo'),
    collotionCategory: '',  // 	获取所有的服装分类及各分类收藏数量
    collotionStatus: '',  // 	收藏全部状态及数量
    promotionListDetails: '',  // 	根据会员等级加载推荐列表详情
    isPermissions: wx.getStorageSync('isPermissions'), // 是否权限弹窗
    piclist:'', // 精品区商品列表
  },
  methods: {
    goAnyWhere(e) {
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      })
    },
    onLoad(){
      
    },
    // rpx转px
    px(rpx) {
      var systemInfo = wx.getSystemInfoSync()
      return rpx / 750 * systemInfo.windowWidth
    },
    getUserInfo(res_login){
      return new Promise((resolve, reject) => {
        wx.getUserInfo({
          success: res => {
            // console.log(res)
            var jsonData = {
              code: res_login.code,
              encryptedData: res.encryptedData,
              iv: res.iv
            }
            Api.userinfo(jsonData).then(res => {
              if (res.data.code == 200) {
                wx.setStorageSync('userinfo', res.data.data)
                wx.setStorageSync('isAppoint', res.data.data.isAppoint)
                wx.navigateBack()
                resolve(res.data.data)
              }
            }, err => {

            })
            if (this.userInfoReadyCallback) {
              this.userInfoReadyCallback(res)
            }
          }
        })
      })
    },
  },
  pageLisener: {
    onLoad(options){
      // console.log('我在' + this.route, '参数为', options);
    }
  }
})