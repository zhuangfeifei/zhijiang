let Api = require("../../../../wxApi/api.js")
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    logo: "/images/home/zhijiang.png",
    headIcon: "",
    thme: "",
    imgl: "/images/home/copyright.jpg",
    url: "",
    urls: "",
    text: '',
    showSharePic: false, //分享海报显示隐藏
    sharePicUrl: '', //生成海报链接
    imglist: [
      "/images/home/copyright.jpg"
    ]
  },

  //图片点击放大预览(长按预览保存)
  ondoubimg(e) {
    let that = this
    // let imgArr = that.data.imglist;ssss
    wx.previewImage({
      current: app.store.$state.imgad+"ewm.jpg",
      urls: [ app.store.$state.imgad+"ewm.jpg"],
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  //显示/生成分享海报
  showPic() {

    let sharePicUrl = this.data.sharePicUrl;

    if (sharePicUrl != '') { //如果已经生成过一次直接显示
      this.setData({
        showSharePic: true
      })
    } else {
      wx.showToast({
        title: '图片生成中',
        mask: true,
        icon: 'loading',
        duration: 100000
      });

      this.setData({
        share: false
      })

      let logo = '';
      let headIcon = '';
      let code = '';

      this.getHead().then(headUrl => {
        headIcon = headUrl
        return this.getLogo();
      }).then(logoUrl => {
        logo = logoUrl;
        return this.getCode();
      }).then(codeUrl => {
        code = codeUrl;
        this.drawImg(logo, headIcon, code);
      })
    }
  },

  //获取头像
  getHead() {
    let that = this
    if (that.data.id == 0) {
      return new Promise((resolve, reject) => {
        wx.downloadFile({
          url: that.data.url + that.data.headIcon,
          success: res => {
            resolve(res.tempFilePath)
          }
        })
      })
    } else {
      return new Promise((resolve, reject) => {
        wx.downloadFile({
          url: that.data.urls + that.data.headIcon,
          success: res => {
            resolve(res.tempFilePath)
          }
        })
      })
    }

  },

  //获取logo
  getLogo() {
    let that = this
    if (that.data.id == 0) {
      return new Promise((resolve, reject) => {
        wx.downloadFile({
          url: that.data.url + that.data.headIcon,
          success: res => {
            resolve(res.tempFilePath);
          },
          fail: (err) => { }
        })
      })
    } else {
      return new Promise((resolve, reject) => {
        wx.downloadFile({
          url: that.data.urls + that.data.headIcon,
          success: res => {
            resolve(res.tempFilePath);
          },
          fail: (err) => { }
        })
      })
    }
  },

  //获取二维码
  getCode() {
    return new Promise((resolve, reject) => {
      wx.downloadFile({
        url:this.data.usimgs+"ewm.jpg",
        success: res => {
          resolve(res.tempFilePath);
        },
      })
    })
  },

  //绘图
  drawImg(logo, headIcon, code) {
    let title = '织匠'; //帖子标题
    let text = this.data.thme
    let w = 0;
    wx.getSystemInfo({
      success: function (res) {
        w = res.screenWidth;
      },
    })

    let ctx = wx.createCanvasContext('shareFrends');

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w / 750 * 670 * 2, w / 750 * 744 * 2);

    if (title.length > 17) {
      title = title.slice(0, 17) + '...';
    }

    //绘制logo
    ctx.drawImage(logo, w / 750 * 10.5 * 6, 75, w / 750 * 583 * 2, w / 750 * 365 * 2)

    //绘制标题
    ctx.setFontSize(25)
    ctx.setFillStyle('#333333') //文字颜色
    ctx.fillText(title, w / 750 * 290 * 2, w / 750 * 50 * 2)
    //绘制内容
    ctx.setFontSize(19)
    ctx.setFillStyle('#333333') //文字颜色
    ctx.fillText(text, w / 750 * 30 * 2, w / 750 * 480 * 2,)
    // ctx.fillText(text)
    // if (text.length > 17) {
    //   text = text.substring(0, 25) + '...';
    //   console.log("123",text)
    // }
    ctx.setFillStyle('#e8e8e8')
    ctx.fillRect(w / 750 * 2 * 2, w / 750 * 495 * 2)
    //绘制图片
    ctx.restore() //恢复之前保存的绘图上下文

    ctx.setFontSize(w / 750 * 24 * 2)
    ctx.setFillStyle('#333333');
    //绘制线条
    ctx.moveTo(w / 750 * 30 * 2, w / 750 * 500 * 2);
    ctx.lineTo(w / 750 * 620 * 2, w / 750 * 500 * 2);
    ctx.setLineWidth = 1;
    ctx.setStrokeStyle('#eee')
    ctx.stroke();
    //绘制二维码
    ctx.drawImage(code, w / 750 * 230 * 2, w / 750 * 520 * 2, w / 750 * 190 * 2, w / 750 * 170 * 2);
    ctx.setFontSize(w / 750 * 20 * 2)
    ctx.setFillStyle('#808080');
    //绘制文本
    ctx.fillText('长 按 扫 码 查 看', w / 750 * 250 * 2, w / 750 * 740 * 2)

    ctx.draw(false, () => {
      //调用接口将画布转换为图片
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        fileType: 'jpg',
        quality: 1,
        width: w / 750 * 670 * 2,
        height: w / 750 * 744 * 2,
        destWidth: w / 750 * 670 * 2,
        destHeight: w / 750 * 744 * 2,
        canvasId: 'shareFrends',
        success: res => {
          wx.hideToast();
          this.setData({
            sharePicUrl: res.tempFilePath //生成的图片路径
          }, () => {

            //渲染完后再显示分享海报
            this.setData({
              share: false,
              showSharePic: true
            })
          })
        },
        fail(err) {
          wx.showToast({
            title: '图片生成失败，请稍候再试！',
            icon: 'none',
            mask: true
          })
        }
      })
    });

  },

  //保存图片
  savePic() {
    let that = this
    let sharePicUrl = that.data.sharePicUrl;
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.writePhotosAlbum'] == false) {
          wx.showModal({
            title: '提示',
            content: '是否授权将图片保存到相册？',
            confirmColor: '#2ca2ed',
            success: res => {
              //点击确定打开授权设置
              if (res.confirm) {
                wx.openSetting({
                  success: res => {
                    setTimeout(() => {
                      if (res.authSetting['scope.writePhotosAlbum'] == true) {
                        wx.saveImageToPhotosAlbum({
                          filePath: sharePicUrl,
                          success: res => {
                            wx.showToast({
                              title: '保存成功！',
                              icon: 'success',
                              mask: true
                            })
                          },
                          fail: err => {
                            wx.showToast({
                              title: '保存失败！',
                              icon: 'none',
                              mask: true
                            })
                          }
                        })

                      } else {
                        wx.showToast({
                          title: '保存失败！',
                          icon: 'none',
                          mask: true
                        })
                      }
                    }, 500)
                  }
                })
              }
            }
          })
        } else {
          wx.saveImageToPhotosAlbum({
            filePath: sharePicUrl,
            success: res => {
              wx.showToast({
                title: '保存成功!',
                icon: 'success',
                mask: true
              })
              this.setData({
                showSharePic: false
              })
            }
          })

        }
      }
    })

  },

  onLoad: function (options) {
    let that = this;
    if (options) {
      that.setData({
        headIcon: options.pic,
        id: options.id,
        url:app.store.$state.imgUrlotler,
        urls:app.store.$state.imgUrl,
        usimgs:app.store.$state.imgad
      })
    }
    if(options.thme.length>17){
      let thme = options.thme.substring(0,27)+ '...';
      that.setData({
        thme:thme
      })
    }else{
      let thme = options.thme
      that.setData({
        thme:thme
      })
    }
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
  onShareAppMessage: function (res) {
    let that = this
    if (res.from == "button") {
      return {
        title: that.data.thme,
      }
    }
  }
})