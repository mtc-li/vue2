import request from '@/utils/request'
export const login = data => {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}
/*
  获取用户资料接口
*/
export function getUserInfo () {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}
/*
获取Header的图片
*/
export function getUserId (id) {
  return request({
    url: `sys/user/${id}`
  })
}
