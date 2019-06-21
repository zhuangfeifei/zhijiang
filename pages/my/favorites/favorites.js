// pages/my/favorites/favorites.js
import Watch from '../../../utils/watch.js'
const Api = require('../../../wxApi/api.js')
const app = getApp()
let watch;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationLeft: '', animationRight: '', animationRound:'', checkedAll: false, isManagement: true,
    isAnimation: true, isShow: '', allCategory: false, allState: false,
    screenHeight: '',
    collotionCloth:'', // 收藏夹,
    current: 1, categoryid: '', smallcategoryid: '', isMore: false,
    isState: false, // 状态
    statusType:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    watch = new Watch(this)
    let screenHeight = wx.getSystemInfoSync().windowHeight
    this.setData({ screenHeight: screenHeight - this.px(120)})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.animationRound()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取所有的服装分类及各分类收藏数量
    Api.collotionCategory({ unionId: app.store.$state.userinfo.unionid }).then(res=>{
      if(res.data.code == 200){
        app.store.setState({ collotionCategory: res.data })
      }
    },err=>{

    })
    // 收藏全部状态及数量
    Api.collotionStatus({ unionId: app.store.$state.userinfo.unionid }).then(res=>{
      if(res.data.code == 200){
        app.store.setState({ collotionStatus: res.data.data })
      }
    },err=>{

    })
    this.onReachBottom()
  },
  // 列表添加checked状态
  stateChecked(data){
    let list = []
    for(let val of data){
      val.checked = false
      list.push(val)
    }
    return list
  },
  // 小类收藏
  categoryDetails(e){
    let data = e.currentTarget.dataset
    this.setData({
      current: 1,
      categoryid: data.categoryid,
      smallcategoryid: data.smallcategoryid,
      allCategory: false,
      isState: false,
      isMore: false
    })
    this.onReachBottom()
  },
  // 商品详情
  goodsListDetails(e){
    let details = e.currentTarget.dataset.data;
    let iscollotion = 1
    wx.navigateTo({
      url: `/pages/index/wedding_details/wedding_details?postid=${details.id}&title=${details.goods_name}&iscollotion=${iscollotion}`
    })
  },
  // 样式切换
  isManagement() {
    this.setData({
      isManagement: !this.data.isManagement
    })
  },
  // 管理
  management() {
    const animationLeft = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    const animationRight = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })

    animationLeft.translate(this.data.isAnimation ? this.px(100) : 0).step({ duration: 500 })
    animationRight.translate(this.data.isAnimation ? this.px(120) : 0).step({ duration: 500 })

    this.setData({
      animationLeft: animationLeft.export(),
      animationRight: animationRight.export(),
      isAnimation: !this.data.isAnimation,
      allCategory: false,
      allState: false
    })
  },
  // 单选
  checke(e) {
    this.data.collotionCloth[e.currentTarget.dataset.index].checked = !this.data.collotionCloth[e.currentTarget.dataset.index].checked
    watch.setData({
      collotionCloth: this.data.collotionCloth,
    })
  },
  // 全选
  checkedAll() {
    for (let index in this.data.collotionCloth) {
      this.data.collotionCloth[index].checked = !this.data.checkedAll
    }
    this.setData({
      collotionCloth: this.data.collotionCloth,
      checkedAll: !this.data.checkedAll
    })
  },
  watch: {
    collotionCloth(value) {
      let isChecked = true
      for (let val of value) {
        if (!val.checked) isChecked = false
      }
      this.setData({ checkedAll: isChecked })
    }
  },
  // 全部类目
  allCategory() {
    if (this.data.isAnimation) {
      this.setData({
        allCategory: !this.data.allCategory,
        allState: false,
      })
    }
  },
  // 全部状态
  allState() {
    if (this.data.isAnimation) {
      this.setData({
        allCategory: false,
        allState: !this.data.allState
      })
    }
  },

  // 获取各状态下收藏服装列表数据
  collotionStatusCloth(e){
    this.setData({ 
      statusType: e.currentTarget.dataset.state,
      allState: false,
      isState: true, 
      current: 1,
      isMore: false
    })
    this.onReachBottom()
  },

  // 删除收藏服装
  deleteCollotion(){
    let arr = []
    for(let val of this.data.collotionCloth){
      val.checked ? arr.push(val.id) : ''
    }
    if(arr.length > 0){
      Api.deleteCollotion({ unionId: app.store.$state.userinfo.unionid, clothIds: arr.join() }).then(res=>{
        // console.log(res.data)
        if(res.data.code == 200){
          this.setData({
            current: 1,
          })
          this.onReachBottom()
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 2000
          })
          this.management()
        }
      })
    }
  },
  // 一键清空收藏中已下架服装
  emptyShelves(){
    Api.emptyShelves({ unionId: app.store.$state.userinfo.unionid }).then(res=>{
      // console.log(res.data)
      if(res.data.code == 200){
        this.setData({
          current: 1,
        })
        this.onReachBottom()
        this.management()
        wx.showToast({
          title: '清空成功',
          icon: 'success',
          duration: 2000
        })
      }
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

  // 所有类目内容
  allcategoryDetails(){
    this.setData({
      current: 1, categoryid: '', smallcategoryid: '', allCategory: false, isState: false, isMore: false
    })
    this.onReachBottom()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom () {
    if(!this.data.isMore){
      if(this.data.isState){ // 状态
        Api.collotionStatusCloth({ statusType: this.data.statusType, unionId: app.store.$state.userinfo.unionid, 
          limit: 10, current: this.data.current }).then(res=>{
          // console.log(res.data)
          this.getMore(res)
        })
      }else{  // 类目
        Api.collotionCloth({
          unionId: app.store.$state.userinfo.unionid, categoryId: this.data.categoryid, 
          smallCategoryId: this.data.smallcategoryid, limit: 10, current: this.data.current }).then(res => {
          // console.log(res.data)
          if (res.data.code == 200) {
            this.getMore(res)
          }
        }, err => {
    
        })
      }
    }
  },
  getMore(res){
    let currents = this.data.current + 1
    this.setData({
      current: currents,
      isMore: res.data.data.length == 0 ? true : false,
      collotionCloth: currents > 2 ? this.data.collotionCloth.concat(this.stateChecked(res.data.data)) : this.stateChecked(res.data.data)
    })
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})