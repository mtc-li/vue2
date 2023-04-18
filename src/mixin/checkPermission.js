// 做一个混入对象
import store from '@/store'
export default {
  methods: {
    // 检查权限 去登录时的信息里面找，points中有KEY  则有权限，如果没有key则不能点击
    checkPermission (key) {
      const { userInfo } = store.state.user
      if (userInfo.roles && userInfo.roles.points) {
        return userInfo.roles.points.some(item => item === key)
      }
      return false // 如果没进去，说明没权限
    }
  }
}
