export const getCookie = (name) => {
  let arr = null
  const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  // eslint-disable-next-line no-cond-assign
  if (arr = document.cookie.match(reg)) {
    return unescape(arr[2])
  } else {
    return null
  }
}
// 设置cookie
export const setCookie = (name, value, expiredays) => {
  const exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = name + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
}
// 删除cookie
export const delCookie = (name) => {
  const exp = new Date()
  exp.setTime(exp.getTime() - 1)
  const cval = getCookie(name)
  if (cval != null) {
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
  }
}

export const setHome = (obj, url) => {
  url = url || location.href
  try {
    obj.style.behavior = 'url(#default#homepage)'
    obj.setHomePage(url)
  } catch (e) {
    if (window.netscape) {
      try {
        // eslint-disable-next-line no-undef
        netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect')
      } catch (e) {
        alert('抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为\'true\'')
      }
    } else {
      alert('抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将【' + url + '】设置为首页。')
    }
  }
}

/**
 * @desc 日期格式化
 * @date 2018-02-10 16:15:03
 * @param {*} 要格式化的日期
 * @param {string} formate 'yyyy/MM/dd hh:mm:ss'
 * @return {string} x string return.
 */
export function formatDate (date, fmt) {
  if (!date) {
    return ''
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  let padLeftZero = function (str) {
    return ('00' + str).substr(str.length)
  }

  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}
