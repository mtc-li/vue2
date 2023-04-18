import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router'
import store from '@/store'
import { getTimeStamp } from './auth'
const timeOut = 3600
const service = axios.create({
  baseURL: '/api',
  timeout: 5000
})

// 添加请求拦截器
service.interceptors.request.use(function (config) {
  if (store.getters.token) {
    if (IsCheckTimeOut()) {
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('token超时了'))
    }

    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
service.interceptors.response.use(function (response) {
  const { success, message, data } = response.data
  if (success) {
    return data
  } else {
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, function (error) {
  if (error.response && error.response.data && error.response.data.code === 10002) {
    // 后端告诉前端token超时了
    store.dispatch('user/logout') // 调用登出action
    router.push('/login') // 跳到登录页
  } else {
    Message.error(error.message)
  }

  return Promise.reject(error)
})
function IsCheckTimeOut () {
  const currentTime = Date.now() // 当前时间戳
  const timeStamp = getTimeStamp() // 存储的时间戳
  return (currentTime - timeStamp) / 1000 > timeOut
}
export default service
