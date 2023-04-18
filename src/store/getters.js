const getters = {
  isCollapse: state => state.user.isCollapse, // 控制头部伸缩
  token: state => state.user.token,
  name: state => state.user.userInfo.username, // 用户名
  userId: state => state.user.userInfo.userId, // 导航前置守卫判断用
  staffPhoto: state => state.user.userInfo.staffPhoto, // 图像图片
  companyId: state => state.user.userInfo.companyId, // 对于公司ID的快捷访问
  routes: state => state.permission.routes // 建立权限模块下的快捷访问
}
export default getters
