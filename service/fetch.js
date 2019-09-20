import axios from 'axios'
import { Message, Notice } from 'iview'
import qs from 'qs'

let getCookie
if (process.client) {
  getCookie = require('~/plugins/utils').getCookie
}

/**
 * ajax请求
 */
let timeLimit = true
axios.defaults.baseURL = ''
axios.defaults.timeout = 10000
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// 拦截器
axios.interceptors.request.use(config => {
  // 将auth添加到请求头
  let auth = getCookie('ASPXAUTH')
  config.headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  if (auth) {
    config.headers.ASPXAUTH = auth
  }
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})

function checkStatus (response) {
  // 如果http状态码正常，则直接返回数据
  if (response) {
    if (timeLimit) {
      // 用户掉线
      if (response.data.Type == 401) {
        timeLimit = false
        Message.error({ content: '账号掉线，请重新登录' })
        window.location.href = `/login`
      } else if (response.data.Type != 1 && response.status !== 200) {
        Notice.error({ title: '错误提示', desc: `错误码：${response.status}，错误信息：${response.statusText}` })
        console.warn(`status:${response.status},statusText:${response.statusText}`)
        console.warn(response.data.Message)
      }
      let timer = setTimeout(() => {
        timeLimit = true
        clearTimeout(timer)
      }, 1000)
    }
    // 如果不需要除了data之外的数据，可以直接 return response.data
    return response.data
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  }
}

function checkCode (res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === -404) {
    Message.error(res.msg)
  }
  return res
}

export default {
  post (url, data) {
    data = qs.stringify(data)
    return axios({
      method: 'post',
      url,
      data
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    ).catch(
      (err) => {
        console.log(err)
        Message.error({ content: '服务器异常' })
      }
    )
  },
  file (url, formData, config = {}) {
    return axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      ...config
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    ).catch(
      (err) => {
        console.log(err)
        Message.error({ content: '服务器异常' })
      }
    )
  },
  get (url, params) {
    return axios({
      method: 'get',
      url,
      params: params
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    ).catch(
      (err) => {
        console.log(err)
        Message.error({ content: '服务器异常' })
      }
    )
  }
}
