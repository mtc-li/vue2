import { login, getUserInfo, getUserId } from '@/api/user'
import { setItem, getItem, removeItem, setTimeStamp } from '@/utils/auth'
import { resetRouter } from '@/router'
export default ({
  namespaced: true,
  state: {
    isCollapse: false, // 控制页面伸缩
    token: getItem(),
    userInfo: {} // 用户资料
  },
  mutations: {
    setToken (state, data) {
      state.token = data
      setItem(data)
    },
    setiscollapse (state) { // 改变页面伸缩的方法
      state.isCollapse = !state.isCollapse
    },
    removeToken (state) { // 删除token
      state.token = null
      removeItem()
    },
    setUserInfo (state, result) { // 存储用户资料
      state.userInfo = result
    },
    removeUserInfo (state) { // 删除用户资料
      state.userInfo = {}
    }

  },
  actions: {
    async getlogin (context, data) { // 登录存token并且设置当前时间戳
      const result = await login(data)
      // console.log(result)
      context.commit('setToken', result)
      setTimeStamp() // 设置当前时间戳
    },
    async getUserInfo (context) { // 存用户信息
      const result = await getUserInfo()
      const baseInfo = await getUserId(result.userId)
      const obj = { ...result, ...baseInfo }
      context.commit('setUserInfo', obj)
      return result
    },
    logout (context) {
      // 删除token
      context.commit('removeToken')
      // 删除用户资料
      context.commit('removeUserInfo')
      resetRouter()// 重置路由
      // 调用兄弟模块的mutations ，加上第三个参数{ root: true }可以访问兄弟模块的mutations
      // 去设置权限模块下路由为初始状态
      context.commit('permission/setRoutes', [], { root: true })
    }
  }

})
