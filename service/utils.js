/**
 * @desc 检查是否是移动端（Mobile）、ipad、iphone、微信、QQ等
 * @date 2018-02-10 16:01:21
 * @return {Object}  返回browser对象
 */
export const userAgent = (u = navigator.userAgent) => {
  let browser = {
    trident: u.includes('Trident'), // IE内核
    presto: u.includes('Presto'), // opera内核
    webKit: u.includes('AppleWebKit'), // 苹果、谷歌内核
    gecko: u.includes('Gecko') && !u.includes('KHTML'), // 火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
    android: u.includes('Android') || u.includes('Adr'), // android终端
    iPhone: u.includes('iPhone'), // 是否为iPhone或者QQHD浏览器
    iPad: u.includes('iPad'), // 是否iPad
    webApp: !u.includes('Safari'), // 是否web应该程序，没有头部与底部
    weixin: u.includes('MicroMessenger'), // 是否微信 （2015-01-22新增）
    qq: u.match(/\sQQ/i) === ' qq' // 是否QQ
  }
  return browser
}

/**
 * 将树形结构的数据转换成iview支持的结构
 * @param arr {Array} 树形结构数组
 * @return {Array} iView Tree组件支持的结构
 */
export const convertTree = (arr) => {
  return arr.map(item => {
    let title, expand
    let children = null
    title = item.text
    expand = item.state === 'open'
    if (item.children && item.children.length > 0) {
      children = convertTree(item.children)
    }
    return { ...item, title, expand, children }
  })
}

/**
 * 判断字符串是否符合格式要求
 * @param type {String} 字符串类型
 * @param val {String} 字符串
 * @return {Boolean} 是否符合格式
 */
export const checkType = (type, val) => {
  let reg = {
    mobile: /^1[3|4|5|7|8][0-9]\d{4,8}$/,
    zipcode: /^\d{6}$/,
    email: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
    tel: /(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}/,
    business: /^[a-zA-Z\u4E00-\u9FA5]+$/,
    idcard: /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/
  }
  if (reg[type.toLowerCase()]) {
    return reg[type.toLowerCase()].test(val)
  } else {
    return false
  }
}
