import request from '@/utils/request'
const api = {
  //螺丝攻选项卡查询
  luowen(params) {
    return request({
      url: '/search/luowen',
      method: 'GET',
      params
    })
  },
  //螺丝攻列表
  luowenlist(params) {
    return request({
      url: '/index/luowenlist',
      method: 'GET',
      params
    })
  },
  //螺丝攻详情
  luowenDetail(params) {
    return request({
      url: '/index/luowenDetail',
      method: 'POST',
      data:params
    })
  },
  //圆板牙选项卡查询
  yuanban(params) {
    return request({
      url: '/search/yuanban',
      method: 'GET',
      params
    })
  },
  //圆板牙列表
  yuanbanlist(params) {
    return request({
      url: '/index/yuanbanlist',
      method: 'POST',
      data:params
    })
  },
  //圆板牙详情
  yuanbanDetail(params) {
    return request({
      url: '/index/yuanbanDetail',
      method: 'POST',
      data:params
    })
  },
  //中心钻选项卡查询
  zhuan(params) {
    return request({
      url: '/search/zhuan',
      method: 'GET',
      params
    })
  },
  //中心钻列表
  zhuanList(params) {
    return request({
      url: '/index/zhuanList',
      method: 'POST',
      data:params
    })
  },
  //中心钻详情
  zhuanDetail(params) {
    return request({
      url: '/index/zuanDetail',
      method: 'POST',
      data:params
    })
  },
  //铣刀选项卡查询
  chongdao(params) {
    return request({
      url: '/search/chongdao',
      method: 'GET',
      params
    })
  },
  //铣刀列表
  chongdaolist(params) {
    return request({
      url: '/index/chongdaolist',
      method: 'POST',
      data:params
    })
  },
  //铣刀详情
  chongdaoDetail(params) {
    return request({
      url: '/index/chongdaoDetail',
      method: 'POST',
      data:params
    })
  },
  //孔面选项卡查询
  kongmian(params) {
    return request({
      url: '/search/kongmian',
      method: 'GET',
      params
    })
  },
  //孔面列表
  kongmianList(params) {
    return request({
      url: '/index/kongmianList',
      method: 'POST',
      data:params
    })
  },
  //孔面详情
  kongmianDetail(params) {
    return request({
      url: '/index/kongmianDetail',
      method: 'POST',
      data:params
    })
  },
  //计算加工速度选项卡
  speed(params) {
    return request({
      url: '/index/speed',
      method: 'POST',
      params
    })
  },
  //计算建议的底孔径选项卡
  bored(params) {
    return request({
      url: '/index/bored',
      method: 'GET',
      params
    })
  }

};
export default api
