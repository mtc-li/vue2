import { routes, asyncRoutes } from '@/router'
const state = {
  routes: routes // 表示当前用户拥有的全部路由的数组
}
const mutations = {
  setRoutes (state, newRotes) {
    state.routes = [...routes, ...newRotes] // 每次都在静态路由的基础上添加新的路由
  }
}
const actions = {
  // 筛选权限路由
  // 第二个参数menus 是 当前用户所有的菜单权限
  filterRoutes (context, menus) {
    const routes = []
    menus.forEach(key => {
      routes.push(...asyncRoutes.filter(item => item.name === key))
    })
    // 得到的routes是所有模块中满足权限要求的路由数组
    context.commit('setRoutes', routes)
    return routes
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
