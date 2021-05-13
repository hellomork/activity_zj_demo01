// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import Cookies from 'js-cookie'
import apis from '@/api/service'
import store from './store'
// element组件
import Element from 'element-ui'
import Vant from 'vant'
import promise from 'es6-promise'
import lottie from 'vue-lottie';

// 样式
import 'element-ui/lib/theme-chalk/index.css'
import 'vant/lib/index.css'
import '@/style/index.scss'
import '@/assets/icons/index'
import interfaceList from '@/api/interface/user'
import globalFilters from '@/filters/index'
// 路由拦截
import './http/routerChange'
// 轮播
import vueSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.config.productionTip = false
Vue.component('lottie', lottie)
promise.polyfill()
// if (process.env.NODE_ENV === 'development') {
//   require('./mock/index.js')
// }
Vue.use(Vant).use(apis).use(globalFilters).use(vueSwiper).use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})
// 检测平台
var nowMachineWidth = document.body.clientWidth
if (nowMachineWidth < 750) {
  store.commit('SET_ISMOBILE', true)
} else {
  store.commit('SET_ISMOBILE', false)
}
/* eslint-disable no-new */
// interfaceList.getSysTime().then(resData => {
// var nowTime = new Date().getTime()
// var sysTime = resData.data.data.timestamp
// store.commit('SET_SYSTIME', sysTime - nowTime)
interfaceList.getSession().then(res => {
  console.log('getSession', res.data.data.list[0].user)
  store.commit('SET_USERINFO', res.data.data.list[0].user)
  //   console.log(res.data.data.list[0].thrid_user)
  // interfaceList.getSignature().then(resUploadData => {
  // store.commit('SET_UPLOADPARAMS', resUploadData.data.data.list[0])
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
  })
// })
// })
})
