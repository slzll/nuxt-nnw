import { SAVE_USER_INFO, GET_USERAGENT } from './mutation-types'

let userAgent = require('~/service/utils').userAgent
export const state = () => ({
  userInfo: {},
  userAgent: {}
})

export const actions = {
  nuxtServerInit ({ commit }, { req, app }) {
    if (req.headers['user-agent']) {
      commit(GET_USERAGENT, (userAgent && userAgent(req.headers['user-agent'])))
    }
  },
  saveUserInfo ({ state, commit }, payload) {
    commit(SAVE_USER_INFO, payload)
  }
}

export const mutations = {
  // 保存用户信息
  [SAVE_USER_INFO] (state, userInfo) {
    state.userInfo = userInfo
  },
  [GET_USERAGENT] (state, userAgent) {
    state.userAgent = userAgent
  }
}
