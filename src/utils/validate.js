export function validMobile (rule, value, callback) {
  const reg = /^1[3-9]\d{9}$/
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else if (!reg.test(value)) {
    callback(new Error('请输入正确的手机号'))
  } else {
    callback()
  }
}
export function validPassword (rule, value, callback) {
  const reg = /^\d{6}$/
  if (value === '') {
    callback(new Error('密码不能为空'))
  } else if (!reg.test(value)) {
    callback(new Error('密码格式不正确'))
  } else {
    callback()
  }
}
