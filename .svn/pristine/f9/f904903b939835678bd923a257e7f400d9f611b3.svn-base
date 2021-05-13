/*
 * @Author: Jordan
 * @Date: 2019-07-24 19:01:46
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-05-12 17:09:22
 */
import { login, loginOut } from '@/api/interface/user'
const app = {
  state: {
    userInfo: null,
    isMobile: false,
    operateCode: 'c0612dbe-b2ec-11eb-8ecb-b8599f37e6f0',
    timeDiff: 0,
    loginFlag: false,
    registerFlag: false,
    backrouter:'',
    uploadParams: null,
    cityName: null, // 所在城市
    longitude: null, // 用户所在纬度
    latitude: null // 用户所在经度
  },

  mutations: {
    SET_UPLOADPARAMS: (state, uploadParams) => {
      state.uploadParams = uploadParams
    },
    SET_ISMOBILE: (state, isMobile) => {
      state.isMobile = isMobile
    },
    SET_USERINFO: (state, userinfo) => {
      state.userInfo = userinfo
    },
    SET_SYSTIME: (state, timeDiff) => {
      state.timeDiff = timeDiff
    },
    SET_REGISTERSTATE: (state, registerFlag) => {
      state.registerFlag = registerFlag
    },
    SET_LOGINSTATE: (state, loginFlag) => {
      state.loginFlag = loginFlag
    },
    SET_CITY: (state, cityName) => {
      state.cityName = cityName
    },
    SET_BACKROUTER: (state, backrouter) => {
      state.backrouter = backrouter
    },
    SET_LONGITUDE: (state, longitude) => {
      state.longitude = longitude
    },
    SET_LATITUDE: (state, latitude) => {
      state.latitude = latitude
    }
  },
  actions: {
    // 用户登录
    login({ commit }, userInfo) {
      const { mobile, pwd, verifyCodes } = userInfo
      return new Promise((resolve, reject) => {
        login({ mobile: mobile.trim(), pwd: pwd, verifyCodes: verifyCodes }).then(response => {
          const { data } = response
          if (data.status.returnCode === 100) {
            commit('SET_USERINFO', response.data.data.list[0].user)
          }
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 用户登出
    loginOut({ commit }) {
      return new Promise((resolve, reject) => {
        loginOut().then(res => {
          commit('SET_USERINFOLOGIN', null)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default app
