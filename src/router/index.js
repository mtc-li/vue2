import Vue from 'vue'
import VueRouter from 'vue-router'

import approvalsRouter from './modules/approvals'
import departmentsRouter from './modules/departments'
import employeesRouter from './modules/employees'
import permissionRouter from './modules/permission'
import attendancesRouter from './modules/attendances'
import salarysRouter from './modules/salarys'
import settingRouter from './modules/setting'
import socialRouter from './modules/social'
// 动态路由
export const asyncRoutes = [
  approvalsRouter,
  departmentsRouter,
  employeesRouter,
  permissionRouter,
  attendancesRouter,
  salarysRouter,
  settingRouter,
  socialRouter
]

Vue.use(VueRouter)

export const routes = [
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/404',
    name: '404',
    hidden: true,
    component: () => import('../views/404.vue')
  },
  {
    path: '/',
    name: 'layout',
    redirect: '/product',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: 'product',
        name: 'dashboard',
        component: () => import('../views/product/index.vue'),
        meta: {
          title: '首页',
          icon: 'el-icon-menu'
        }

      }
    ]
  },
  {
    path: '/import',
    component: () => import('@/layout/index.vue'),
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/import')
      }
    ]
  }

]

const createRouter = () => new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes: [...routes]
})
const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router
