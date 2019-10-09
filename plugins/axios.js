export default ({ app: { $axios } }) => {
  // 基本配置
  $axios.defaults.timeout = 10000
  $axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

  // 请求回调
  $axios.onRequest(config => {
    let isDev = process.env.NODE_ENV === 'development'
    let prefix = !isDev && process.server ? 'http://localhost' : ''
    config.url = prefix + config.url
    console.log('Making request to ' + config.url)
  })

  // 返回回调
  $axios.onResponse(res => {
  })

  // 错误回调
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    console.log(code)
  })
}
