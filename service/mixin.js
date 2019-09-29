import { mapState } from 'vuex'
import { getWxAuthModel, ALLAPI } from './api'
import { SAVE_USER_INFO } from '~/store/mutation-types'

export const goBack = {
  methods: {
    goBack () {
      if (document.referrer === '') {
        this.$router.push('/')
      } else {
        this.$router.go(-1)
      }
    }
  }
}

export const wxAuth = {
  data () {
    return {
      url: ''
    }
  },
  computed: {
    ...mapState(['userAgent'])
  },
  mounted () {
    this.url = window.location.href
    if (this.userAgent.weixin) {
      getWxAuthModel({
        url: this.url,
        jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'],
        callback: this.checkJsaApi
      }).then(r => console.log('调用签名接口成功'))
    }
  }
}

export const userInfo = {
  async fetch ({ app, store, isDev }) {
    let prefix = !isDev && process.server ? 'http://localhost' : ''
    let userInfo = await app.$axios.$post(prefix + ALLAPI.LoginShort)
    const { RoleName, UserType } = userInfo.Data
    store.commit(SAVE_USER_INFO, { ...userInfo.Data.Model, RoleName, UserType })
  }
}
