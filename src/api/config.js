const API_LIST = {
  visit: {
    insert: 'visitor/insertKaVisitor.show'
  },
  user: {
    sysTime: 'common/getSystemInfo.login',
    // info: 'users/getSessionThridUserInfo.show',
    info: 'users/getSessionUserInfo.show',
    insertArt: 'artSchool/insertArtSchool.show',
    updateArt: 'artSchool/updateArtSchool.do',
    getList: 'artSchool/getArtSchoolList.show',
    getDetail: 'artSchool/getArtSchoolDetail.show',
    login: 'users/managerLogin.show',
    loginPic: 'common/getLoginCode.show',
    loginOut: 'common/loginOut.show',
    bindMobile: 'users/bindUserMobile.show', // 绑定手机/注册
    updateMobile: 'users/bindUpdateUserMobile.show',
    verifyCodes: 'common/getVerifyCodes.show', // 获取手机验证码
    checkCodes: 'common/checkVerifyCodes.show', // 验证验证码是否正确
    signature: 'common/getSignature.show',
    vote: 'ocStatistic/insertKaOcStatistic.show', // 用户投票
    province: 'common/getProvinceRegionList.show',
    cityOrCountry: 'common/getRegionListByPareaCode.show',
    statics: 'operate/usersReade.show'// 用户访问统计接口
  },
  act: {
    allData: 'operate/allData.show',
    list: 'operate/getFrontOperateContentList.show',
    detail: 'operate/getFrontOperateContentDetail.show',
    special: 'operateUser/getExpertUserListByOperateCode.show',
    specialDetail: 'getSpecialDetail.show',
    sVote: 'ocStatistic/insertKaOcStatistic.show', // 专家投票
    upload: 'operate/userContribution.show',
    getTodayCanVouteCount: 'operate/getTodayCanVouteCount.show' // 今日还可投票数
  },
  backEnd: {
    list: 'operateContent/getKaOperateContentList.show', // 后台获取投稿列表
    check: 'operateContent/updateOpContentStatus.do'// 后台审核活动
  },
  common: {
    share: 'common/getFShareAutograph.show', // 获取微信分享参数
    checkmobile: 'users/getUserInfoByMobile.show'
  }
}

export default API_LIST
