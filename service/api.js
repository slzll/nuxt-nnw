import fetch from './fetch'

const API = '/api'
const Page = `${API}/Page`
const articleParams = { page: 1, rows: 5, order: 'desc', sort: 'sort' }
export const ALLAPI = {
  LoginShort: `${Page}/LoginShort`,
  LoginCode: `${Page}/LoginCode`,
  LoginOut: `${Page}/LoginOut`,
  Login: `${Page}/Login`,
  ArticleList: `${Page}/ArticleList`,
  LeftNotice: `${Page}/LeftNotice`,
  TeachClassList: `${Page}/TeachClassList`
}

export const LoginShort = (data) => fetch.post(ALLAPI.LoginShort, { ...data })
export const LoginOut = (data) => fetch.post(ALLAPI.LoginOut, { ...data })
export const LoginCode = (data) => fetch.post(ALLAPI.LoginCode, { ...data })
export const Login = (data) => fetch.post(ALLAPI.Login, { ...data })
export const ArticleList = (data) => fetch.post(ALLAPI.ArticleList, { ...articleParams, ...data })
export const TeachClassList = (data) => fetch.post(ALLAPI.TeachClassList, { ...data })
