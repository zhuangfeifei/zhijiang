const api = require('./main')

module.exports = {
  request: api.request,
  imgUrl: api.API_BASE_URLs,
  imgUrls: api.API_BASE_URL,
  userinfo: (data) => { // 登录
    return api.request('/wechat/login/userinfo', 'post', data)
  },

  category: (data) => { //精品区头部大类
    return api.request('/api/boutique/category', 'post', data)
  },
  categoryBoutique: (data) => { //小类下的婚纱图片集合
    return api.request('/api/boutique/categoryBoutique', 'post', data)
  },
  imgarrlist: (data) => { //首页轮播图展示
    return api.request('/api/basic/carousel', 'post', data)
  },
  categorylist: (data) => { //首页婚纱展示
    return api.request('/api/boutique/dressFrontPage', 'post', data)
  },
  categorydetil: (data) => { //婚纱展示详情
    return api.request('/api/boutique/clothDetail', 'post', data)
  },
  newurlimgs: (data) => { //实店新闻轮播图
    return api.request('/api/storeNews/caseListForPage', 'post', data)
  },
  newurltitle: (data) => { //实店新闻案例类型
    return api.request('/api/storeNews/caseTypeList', 'post', data)
  },
  newurltitlelist: (data) => { //实店新闻案例类型下的列表
    return api.request('/api/storeNews/caseList', 'post', data)
  },
  newlistt: (data) => { //实店新闻案例详情
    return api.request('/api/storeNews/caseDetail', 'post', data)
  },
  newlisttclick: (data) => { //实店新闻案例详情点赞
    return api.request('/api/storeNews/givePraise', 'post', data)
  },
  onslisttclick: (data) => { //实店新闻案例详情取消点赞
    return api.request('/api/storeNews/cancelPraise', 'post', data)
  },
  onclickcllon:(data) =>{//商品收藏
    return api.request('/api/boutique/clickColltion', 'post', data)
  },
  onclickcllonun: (data) => {//取消商品收藏
    return api.request('/api/boutique/deleteCollotion', 'post', data)
  },
  
  // 我的会员
  promotionList: data => { //根据会员等级加载推荐列表
    return api.request('/api/customer/promotionList', 'post', data)
  },
  collotionCategory: data => { //获取所有的服装分类及各分类收藏数量
    return api.request('/api/boutique/collotionCategory', 'post', data)
  },
  collotionStatus: data => { //收藏全部状态及数量
    return api.request('/api/boutique/collotionStatus', 'post', data)
  },
  collotionCloth: data => { //根据大类，小类，全部分类获取收藏服装数据
    return api.request('/api/boutique/collotionCloth', 'post', data)
  },
  collotionStatusCloth: data => { //获取各状态下收藏服装列表数据
    return api.request('/api/boutique/collotionStatusCloth', 'post', data)
  },
  deleteCollotion: data => { //删除收藏服装
    return api.request('/api/boutique/deleteCollotion', 'post', data)
  },
  emptyShelves: data => { //一键清空收藏中已下架服装
    return api.request('/api/boutique/emptyShelves', 'post', data)
  },
  listadress: data => { //用户收货地址列表
    return api.request('/api/address/listadress', 'post', data)
  },
  addadress: data => { //添加用户地址
    return api.request('/api/address/addadress', 'post', data)
  },
  defaultById: data => { //设置默认地址
    return api.request('/api/address/defaultById', 'post', data)
  },
  updateadress: data => { //更新用户地址
    return api.request('/api/address/updateadress', 'post', data)
  },
  deladress: data => { //删除用户地址
    return api.request('/api/address/deladress', 'post', data)
  },
  authorityFilter: data => { //会员权限认证
    return api.request('/api/customer/authorityFilter', 'post', data)
  },
  code: data => { //发送验证码
    return api.request('/api/customer/code', 'post', data)
  },
  phoneNew: data => { //绑定手机号
    return api.request('/api/bind/phoneNew', 'post', data)
  },
  addAppoint: data => { //添加预约
    return api.request('/api/customer/addAppoint', 'post', data)
  },
  getAppoint: data => { //会员查询预约记录
    return api.request('/api/customer/getAppoint', 'post', data)
  },
  editAppoint: data => { //取消预约
    return api.request('/api/customer/editAppoint', 'post', data)
  },
  addCs: data => { //新增投诉
    return api.request('/api/cs/addCs', 'post', data)
  },
  delCs: data => { //取消投诉
    return api.request('/api/cs/delCs', 'post', data)
  },
  myCs: data => { //获取某用户所有的投诉与建议列表
    return api.request('/api/cs/myCs', 'post', data)
  },
}