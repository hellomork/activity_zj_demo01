import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.ROUTER_BASE,
  routes: [
    {
      path: '/',
      redirect: '/21dxdz'
    },
    {
      path: '/21dxdz',
      name: '21dxdz',
      component: () => import('@/views/htmls/index'),
      meta: {
        pageTitle: '首页'
      }
    },
    {
      path: '/picshow',
      name: 'picshow',
      component: () => import('@/views/htmls/picshow'),
      meta: {
        pageTitle: '雕塑展示'
      }
    },
    {
      path: '/picshow_detail/:ocCode',
      name: 'picshow_detail',
      component: () => import('@/views/htmls/picshow_detail'),
      meta: {
        pageTitle: '雕塑详情'
      }
    },
    {
      path: '/character_detail/:ocCode',
      name: 'character_detail',
      component: () => import('@/views/htmls/character_detail'),
      meta: {
        pageTitle: '人物详情'
      }
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('@/views/htmls/news'),
      meta: {
        pageTitle: '快讯'
      }
    },
    {
      path: '/report',
      name: 'report',
      component: () => import('@/views/htmls/report'),
      meta: {
        pageTitle: '成果报道'
      }
    },
    {
      path: '/character',
      name: 'character',
      component: () => import('@/views/htmls/character'),
      meta: {
        pageTitle: '雕塑研讨会'
      }
    },
    {
      path: '/theme',
      name: 'theme',
      component: () => import('@/views/htmls/theme'),
      meta: {
        pageTitle: '主题展'
      }
    },

    /** ********************登录**************************** */
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index'),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/mobile_login',
      name: 'mobile_login',
      component: () => import('@/views/login/mobile'),
      meta: {
        title: '手机号登录'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/login/registe'),
      meta: {
        title: '手机注册'
      }
    },
    {
      path: '/agreement',
      name: 'agreement',
      component: () => import('@/views/login/agreement'),
      meta: {
        title: '用户服务协议'
      }
    },
    {
      path: '/forgotpsw',
      name: 'forgotpsw',
      component: () => import('@/views/login/forgotpsw'),
      meta: {
        title: '忘记密码'
      }
    },
    /** ********************第三方登录绑定手机号**************************** */
    {
      path: '/bind_mobile',
      name: 'bind_mobile',
      component: () => import('@/views/login/bind'),
      meta: {
        title: '绑定手机号'
      }
    },
    {
      path: '/pc_bind_mobile',
      name: 'pc_bind_mobile',
      component: () => import('@/views/login/pcbind'),
      meta: {
        title: '绑定手机号'
      }
    }

  ]
})
