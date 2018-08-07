import Vue from 'vue'
import Router from 'vue-router'

const index_page = resolve => { require(['@/views/index'], resolve) };            //首页
const product_search = resolve => { require(['@/views/product_search'], resolve) };            //产品检索
const product_detail1 = resolve => { require(['@/views/product_detail1'], resolve) };            //产品选择1
const product_detail2 = resolve => { require(['@/views/product_detail2'], resolve) };            //产品选择2
const product_detail3 = resolve => { require(['@/views/product_detail3'], resolve) };            //产品选择3
const product_detail4 = resolve => { require(['@/views/product_detail4'], resolve) };            //产品选择4
const product_detail5 = resolve => { require(['@/views/product_detail5'], resolve) };            //产品选择5
const detail1 = resolve => { require(['@/views/detail1'], resolve) };            //产品详情
const detail2 = resolve => { require(['@/views/detail2'], resolve) };            //产品详情
const detail3 = resolve => { require(['@/views/detail3'], resolve) };            //产品详情
const detail4 = resolve => { require(['@/views/detail4'], resolve) };            //产品详情
const detail5 = resolve => { require(['@/views/detail5'], resolve) };            //产品详情
const sfc = resolve => { require(['@/views/sfc'], resolve) };            //left计算
const bsc = resolve => { require(['@/views/bsc'], resolve) };            //right计算


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index_page,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/product_search',
      name: 'product_search',
      component: product_search,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/product_detail1',
      name: 'product_detail1',
      component: product_detail1,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/product_detail2',
      name: 'product_detail2',
      component: product_detail2,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/product_detail3',
      name: 'product_detail3',
      component: product_detail3,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/product_detail4',
      name: 'product_detail4',
      component: product_detail4,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/product_detail5',
      name: 'product_detail5',
      component: product_detail5,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/detail1',
      name: 'detail1',
      component: detail1,
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/detail2',
      name: 'detail3',
      component: detail2,
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/detail3',
      name: 'detail3',
      component: detail3,
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/detail4',
      name: 'detail4',
      component: detail4,
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/detail5',
      name: 'detail5',
      component: detail5,
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/sfc',
      name: 'sfc',
      component: sfc,
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/bsc',
      name: 'bsc',
      component: bsc,
      meta: {
        keepAlive: false // 不需要被缓存
      }
    }
  ]
})
