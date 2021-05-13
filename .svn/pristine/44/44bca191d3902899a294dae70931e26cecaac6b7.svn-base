import service from '@/http/HttpInterceptor.js'
import API_LIST from '@/api/config'

/**
 * 获取session信息
 *
 */
export const getSession = () => {
  return service({
    url: API_LIST.user.info,
    method: 'get'
  })
}
/**
 *
 */
export const insertArt = (params) => {
  return service({
    url: API_LIST.user.insertArt,
    method: 'post',
    data: params
  })
}

/**
 *
 */
export const updateArt = (params) => {
  return service({
    url: API_LIST.user.updateArt,
    method: 'post',
    data: params
  })
}

/**
 *
 */
export const getList = (params) => {
  return service({
    url: API_LIST.user.getList,
    method: 'get',
    params: params
  })
}

/**
 *
 */
export const getDetail = (params) => {
  return service({
    url: API_LIST.user.getDetail,
    method: 'get',
    params: params
  })
}

/**
 * 用户登录
 * @params {*} password
 * @params {*} userCode
 */
export const login = (params) => {
  return service({
    url: API_LIST.user.login,
    method: 'post',
    data: params
  })
}
export const getLoginPic = (params) => {
  return service({
    url: API_LIST.user.loginPic,
    method: 'get',
    params: params
  })
}

/**
 * 获取签名
 * @params {*} password
 * @params {*} userCode
 */
export const getSignature = (params) => {
  return service({
    url: API_LIST.user.signature,
    method: 'post',
    data: params
  })
}

/**
 * 用户登出
 */
export const loginOut = () => {
  return service({
    url: API_LIST.user.loginOut,
    method: 'get'
  })
}
/**
 * 用户投稿绑定/注册
 */
export const bindMobile = (params) => {
  return service({
    url: API_LIST.user.bindMobile,
    method: 'post',
    data: params
  })
}
/**
 * 用户投稿绑定/注册
 */
export const upbindMobile = (params) => {
  return service({
    url: API_LIST.user.updateMobile,
    method: 'post',
    data: params
  })
}
/**
 * 获取手机验证码
 * mobile
 */
export const getVerifyCodes = (params) => {
  return service({
    url: API_LIST.user.verifyCodes,
    method: 'get',
    params: params
  })
}
/**
 * 校对验证码
 * code
 */
export const checkVerifyCodes = (params) => {
  return service({
    url: API_LIST.user.checkCodes,
    method: 'get',
    params: params
  })
}

/**
 * 获取省份
 */
export const getProvinceList = () => {
  return service({
    url: API_LIST.user.province,
    method: 'get'
  })
}
/**
 * 获取城市或者乡村
 * @params {*} params.regionCode // 父级地区code
 */
export const getCityOrCountryList = (params) => {
  return service({
    url: API_LIST.user.cityOrCountry,
    method: 'get',
    params: params
  })
}
/**
 * 校对手机号是否使用过
 * @params {*} mobile
 */
export const judgeMobile = (params) => {
  return service({
    url: API_LIST.user.checkMobile,
    method: 'get',
    params: params
  })
}
export default Object.assign({
  getSession,
  insertArt,
  updateArt,
  getList,
  getDetail,
  login,
  getLoginPic,
  loginOut,
  getSignature,
  bindMobile,
  getVerifyCodes,
  checkVerifyCodes,
  getProvinceList,
  getCityOrCountryList,
  upbindMobile,
  judgeMobile
})
