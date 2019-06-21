// pages/my/certification/certification.js
const Api = require('../../../wxApi/api.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileImg: '', state: 0, value: '', screenHeight: '', showModal: true,
    path:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let screenHeight = wx.getSystemInfoSync().windowHeight
    this.setData({ screenHeight: screenHeight - this.px(145) })
  },
  upFile() {
    wx.chooseImage({
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        // console.log(res)
        this.setData({
          fileImg: res.tempFilePaths[0]
        })
      }
    })
  },
  delete(){
    this.setData({ fileImg: '' })
  },
  isStatus(){
    if(this.data.state == 0){
      wx.uploadFile({
        url: Api.imgUrl + '/api/basic/uploadPicture', // 图片上传接口
        filePath: this.data.fileImg,
        name: 'file',
        success: res=> {
          let data = JSON.parse(res.data)
          // console.log(data)
          if(data.code == 200){
            let index = this.data.state + 1
            this.setData({
              state: index,
              path: data.message
            })
          }
        }
      })
    }else{ //会员权限认证
      Api.authorityFilter({ unionId: app.store.$state.userinfo.unionid, idNumber: this.data.value, pictureName: this.data.path }).then(res=>{
        // console.log(res.data)
        if(res.data.code == 200){
          let index = this.data.state + 1
          this.setData({
            state: index,
          })
          wx.login({
            success: res_login=> {
              if (res_login.code) {
                wx.getSetting({
                  success: res =>{
                    if (res.authSetting['scope.userInfo']) {
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
                              resolve(res.data.data)
                            }
                          }, err => {
              
                          })
                          if (this.userInfoReadyCallback) {
                            this.userInfoReadyCallback(res)
                          }
                        }
                      })
                    }
                  }
                })
              }
            }
          })
        }
      },err=>{

      })
    }
  },
  bindKeyInput(e){
    this.setData({
      value: e.detail.value
    })
  },
  go(){
    wx.switchTab({
      url: '',
    });
  },
  showModal(){
    this.setData({ showModal: !this.data.showModal })
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