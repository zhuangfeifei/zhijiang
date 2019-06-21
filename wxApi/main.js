
const API_BASE_URL = 'https://www.zjwl.shop/bus'
const API_BASE_URLs = 'https://www.zjwl.shop'
const request = (url, method, data) => {
  let _url = API_BASE_URL + url
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      method: method,
      data: data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(request) {
        if(request.data.code == 200){
          resolve(request)
        }else{
          wx.showModal({
            title: '温馨提示',
            content: request.data.message,
            success(res) {
              if (res.confirm) {
                // console.log('用户点击确定')
                if(request.data.code == 9999){
                  wx.navigateTo({
                    url: '/pages/my/bindphone/bindphone'
                  })
                }
              } else if (res.cancel) {
                // console.log('用户点击取消')
              }
            }
          })
        }
      },
      fail(error) {
        reject(error)
      },
      complete(aaa) {
        // 加载完成
      }
    })
  })
}

/**
 * 小程序的promise没有finally方法，自己扩展了下
 */
Promise.prototype.finally = function (callback) {
  var Promise = this.constructor;
  return this.then(
    function (value) {
      Promise.resolve(callback()).then(
        function () {
          return value;
        }
      );
    },
    function (reason) {
      Promise.resolve(callback()).then(
        function () {
          throw reason;
        }
      );
    }
  );
}

module.exports = {
  request, API_BASE_URL, API_BASE_URLs
}