import Cookies from 'js-cookie'

const TokenKey = 'hrsaas-token'
const timeKey = 'timestamp'
export function getItem () {
  return Cookies.get(TokenKey)
}

export function setItem (token) {
  return Cookies.set(TokenKey, token)
}

export function removeItem () {
  return Cookies.remove(TokenKey)
}
// 获取时间戳
export function getTimeStamp () {
  return Cookies.get(timeKey)
}
// 设置时间戳
export function setTimeStamp (timestamp) {
  return Cookies.set(timeKey, Date.now())
}
