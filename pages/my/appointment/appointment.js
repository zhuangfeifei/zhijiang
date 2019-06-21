
const Api = require('../../../wxApi/api.js');
const app = getApp()

const date = new Date()
const years = []
const months = []
const days = []
const hours = []
const minutes = ['00', '30']

for (let i = date.getFullYear(); i <= 2020; i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}
for (let i = 9; i <= 17; i++) {
  hours.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue:"",
    phone:"",
    text:"",
    changTime: false,
    years,
    year: date.getFullYear(),
    months,
    month: date.getMonth() + 1,
    days,
    day: date.getDate(),
    hours,
    hour: date.getHours(),
    minutes,
    minute: '00',
    value: [0, date.getMonth(), date.getDate(), 0, 0],
    times: '',
    animationBottom:'', isChange: false
  },
  //跳转到预约成功页面
  tapindex(e) {
    let list ={
      realname: this.data.inputValue, phone: this.data.phone, 
      ordertime: `${this.data.year}-${this.data.month}-${this.data.day} ${this.data.hour}:${this.data.minute}`, 
      content: this.data.text, unionId: app.store.$state.userinfo.unionid
    }
    Api.addAppoint(list).then(res=>{
      if(res.data.code == 200){
        wx.setStorageSync('isAppoint', 1)
        app.store.setState({
          isAppoint: wx.getStorageSync('isAppoint')
        })
        wx.redirectTo({
          url: '/pages/boutique/tomakes/tomakes',
        })
      }
    })
  },

  //获取姓名
  bindKeyInput(e) {
    let that = this
    that.setData({
      inputValue: e.detail.value
    })
  },

  //获取电话
  bindKeyphone(e) {
    let that = this
    that.setData({
      phone: e.detail.value
    })
  },

  //获取内容
  bindKeytext(e) {
    let that = this
    that.setData({
      text: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 显示时间选择器
  changTime(){
    this.setData({
      changTime: !this.data.changTime
    })
    setTimeout(()=>{
      this.animation()
    },50)
  },
  // 动画
  animation(){
    const animationBottom = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })

    animationBottom.bottom(this.data.changTime ? 0 : -220).step({ duration: 500 })

    this.setData({
      animationBottom: animationBottom.export(),
    })
  },
  // 选择监听
  bindChange(e) {
    const val = e.detail.value
    this.setData({
      times: val
    })
  },
  // 确认选择时间
  setTime(){
    let times = this.data.times == '' ? this.data.value : this.data.times
    this.setData({
      year: this.data.years[times[0]],
      month: this.data.months[times[1]],
      day: this.data.days[times[2]],
      hour: this.data.hours[times[3]],
      minute: this.data.minutes[times[4]],
      isChange: true
    })
    this.changTime()
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