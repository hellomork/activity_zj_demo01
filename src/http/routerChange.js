import router from '../router'
// import apis from '@/api/index'
// // updateRead, behavior
import { insertVistor } from '../api/interface/common.js'
import store from '../store'

router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  next()
})

router.afterEach((to, from) => {
  // todo
  // const params = {}
  // params.operateCode = 'a2f42a5e-daab-11ea-ba14-9c5c8e7be297'
  // if (to.params.ocCode) {
  //   params.ocCode = to.params.ocCode
  // }
  // apis.userStatics(params).then(res => {
  //   // console.log(res)
  // })
  //
  /**
   * 录入访客信息
   */
  const visitParams = {}
  visitParams.menusId = ''
  visitParams.visitTitle = '浙江省红色主题雕塑大展'
  setVistor(visitParams)

  function setVistor(visitParams) {
    visitParams.visitUrl = window.location.href
    visitParams.visitorClient = store.state.app.device // 设备信息：0-安卓web；1-安卓app；2-苹果web；3- 苹果app；4- pc
    insertVistor(visitParams)
  }
})
