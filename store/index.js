import { SAVE_USER_INFO } from './mutation-types'

export const state = () => ({
  userInfo: {}
})

export const actions = {
  nuxtServerInit ({ commit }, { req, app }) {

  },
  saveUserInfo ({ state, commit }, payload) {
    commit(SAVE_USER_INFO, payload)
  }
}

export const mutations = {
  // 保存用户信息
  [SAVE_USER_INFO] (state, userInfo) {
    state.userInfo = userInfo
  }
}
