import fetch from './fetch'

const API = '/api'
const Page = `${API}/Page`
const WeChat = `${API}/WeChat`
const articleParams = { page: 1, rows: 5, order: 'desc', sort: 'sort' }
export const ALLAPI = {
  LoginShort: `${Page}/LoginShort`,
  LoginCode: `${Page}/LoginCode`,
  LoginOut: `${Page}/LoginOut`,
  Login: `${Page}/Login`,
  ArticleList: `${Page}/ArticleList`,
  LeftNotice: `${Page}/LeftNotice`,
  TeachClassList: `${Page}/TeachClassList`,
  ArticleContent: `${Page}/ArticleContent`,
  FavoriteAdd: `${Page}/FavoriteAdd`,
  FavoriteDelete: `${Page}/FavoriteDelete`,
  GetWechatWxAuthModel: `${WeChat}/GetWechatWxAuthModel`
}

export const LoginShort = (data) => fetch.post(ALLAPI.LoginShort, { ...data })
export const LoginOut = (data) => fetch.post(ALLAPI.LoginOut, { ...data })
export const LoginCode = (data) => fetch.post(ALLAPI.LoginCode, { ...data })
export const Login = (data) => fetch.post(ALLAPI.Login, { ...data })
export const ArticleList = (data) => fetch.post(ALLAPI.ArticleList, { ...articleParams, ...data })
export const TeachClassList = (data) => fetch.post(ALLAPI.TeachClassList, { ...data })
export const ArticleContent = (data) => fetch.post(ALLAPI.ArticleContent, { ...data })
export const FavoriteAdd = (data) => fetch.post(ALLAPI.FavoriteAdd, { ...data })
export const FavoriteDelete = (data) => fetch.post(ALLAPI.FavoriteDelete, { ...data })
export const GetWechatWxAuthModel = (data) => fetch.post(ALLAPI.GetWechatWxAuthModel, { ...data })

// 封装微信签名
export const getWxAuthModel = async ({ url, jsApiList, callback }) => {
  let wx = require('weixin-js-sdk')
  let res = await GetWechatWxAuthModel({ url })
  if (res.IsSuccess) {
    wx.config({
      debug: false,
      appId: 'wx162f8471f0935506', // 必填，公众号的唯一标识
      timestamp: res.Data.Timestamp, // 必填，生成签名的时间戳
      nonceStr: res.Data.Nonce, // 必填，生成签名的随机串
      signature: res.Data.Signature, // 必填，签名
      jsApiList // 必填，需要使用的JS接口列表
    })
    callback && callback()
  }
}
