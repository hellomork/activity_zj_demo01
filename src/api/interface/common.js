import service from '@/http/HttpInterceptor.js'
import API_LIST from '@/api/config'

export const getSysTime = (params) => {
  return service({
    url: API_LIST.user.sysTime,
    method: 'get',
    params: params
  })
}

export const getAllData = (params) => {
  return service({
    url: API_LIST.act.allData,
    method: 'get',
    params: params
  })
}

export const getList = (params) => {
  return service({
    url: API_LIST.act.list,
    method: 'get',
    params: params
  })
}
export const getDetail = (params) => {
  return service({
    url: API_LIST.act.detail,
    method: 'get',
    params: params
  })
}

// 专家列表
export const getSpecialList = (params) => {
  return service({
    url: API_LIST.act.special,
    method: 'get',
    params: params
  })
}
// 专家详情 userCode
export const getSpecialDetail = (params) => {
  return service({
    url: API_LIST.act.specialDetail,
    method: 'get',
    params: params
  })
}
// 文件上传
export const uploadWorks = (params) => {
  return service({
    url: API_LIST.act.upload,
    method: 'post',
    data: params
  })
}
// 后台获取列表
export const getBackList = (params) => {
  return service({
    url: API_LIST.backEnd.list,
    method: 'get',
    params: params
  })
}
// 后台审核
export const backCheck = (params) => {
  return service({
    url: API_LIST.backEnd.check,
    method: 'post',
    data: params
  })
}
// 用户投票
// ocCode
// opClientType：固定值（CLIENT_WX）
// operateCode
export const userVote = (params) => {
  return service({
    url: API_LIST.user.vote,
    method: 'post',
    data: params
  })
}
// 用户访问统计接口
// operateCode
// ocCode
export const userStatics = (params) => {
  return service({
    url: API_LIST.user.statics,
    method: 'post',
    data: params
  })
}
/**
 * 录入访客信息
 * @params {*} isApp
 * @params {*} visitTitle
 * @params {*} visitorCity
 * @params {*} visitorLatitude
 * @params {*} visitorLongitude
 */
export const insertVistor = (params) => {
  return service({
    url: API_LIST.visit.insert,
    method: 'get',
    params: params
  })
}
/*
  operateCode
  ocCode
  opClientType：（CLIENT_WX :普通用户投票，CLIENT_ZJF :专家用户第一轮投票， CLIENT_ZJS :专家用户第二轮投票）
 */
export const specialUserVote = (params) => {
  return service({
    url: API_LIST.act.sVote,
    method: 'post',
    data: params
  })
}
/**
 * 分享
 * @params {*} url--当前页面完整的url
 */
export const getShareParams = (params) => {
  return service({
    url: API_LIST.common.share,
    method: 'get',
    params: params
  })
}
/**
 * 今日还可投票数
 * @param {*} params
 */
export const getTodayCanVouteCount = (params) => {
  return service({
    url: API_LIST.act.getTodayCanVouteCount,
    method: 'get',
    params: params
  })
}
/**
 * 获取手机号是否被注册
 * @params {*} mobile
 */
export const checkmobile = (params) => {
  return service({
    url: API_LIST.common.checkmobile,
    method: 'get',
    params: params
  })
}
export default Object.assign({
  getSysTime,
  getAllData,
  getList,
  getDetail,
  getSpecialList,
  getSpecialDetail,
  uploadWorks,
  getBackList,
  backCheck,
  userVote,
  specialUserVote,
  userStatics,
  getShareParams,
  getTodayCanVouteCount,
  checkmobile,
  insertVistor
})
