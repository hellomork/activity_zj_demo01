/*
 * @Author: Jordan
 * @Date: 2019-07-25 11:07:16
 * @Last Modified by: Jordan
 * @Last Modified time: 2019-12-27 14:44:57
 */
import apiList from './index'
const install = Vue => {
  if (install.installed) {
    return
  }
  install.installed = true
  Object.defineProperty(Vue.prototype, '$apis', {
    get() {
      return apiList
    }
  })
}
export default install
