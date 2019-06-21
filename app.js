//app.js
const store = require('store/appStore.js');
const Api = require('wxApi/api.js');
App({
  onLaunch: function () {
    const updateManager = wx.getUpdateManager()
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    // 权限弹窗
    wx.setStorageSync('isPermissions', 0);

    // 登录
    wx.login({
      success: res_login => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // 获取用户信息
        wx.getSetting({
          success: res => {
            // console.log(res)
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
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
                    }
                  }, err => {
      
                  })
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                }
              })
            } else {
              wx.navigateTo({
                url: '/pages/authorization/authorization'
              })
            }
          }
        })
      }
    })
  },
  // 加载
  showLoading: function (title = '加载中') {
    wx.showLoading({
      title: title,
      icon: 'loading',
      mask: true
    });
  },

  // 隐藏加载
  hideLoading: function () {
    wx.hideLoading();
  },

  /// 文字提示弹窗
  showToast: function (msg) {
    if (msg == undefined) {
      wx.showToast({
        title: '网络繁忙，稍后重试',
        icon: 'none',
        mask: true
      })
    } else if (typeof msg == 'string') {
      wx.showToast({
        title: msg,
        icon: 'none',
        mask: true
      })
    }
  },

  /// 获取页面
  invokePage: function (name, handler) {
    let pages = getCurrentPages().reverse();
    for (var i = 0; i < pages.length; i++) {
      if (pages[i].route == `pages/${name}/${name}`) {
        handler(pages[i])
        break
      }
    }
  },
  globalData: {
    userInfo: null
  },
  store: store
})