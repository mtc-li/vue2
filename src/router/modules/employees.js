import Layout from '@/layout'
export default {
  path: '/employees',
  name: 'employees',
  component: Layout,
  children: [
    {
      path: '',
      name: 'employees',
      component: () => import('@/views/employees'),
      meta: {
        title: '员工管理',
        icon: 'iconfont icon-ziliao'
      }
    },
    {
      path: 'detail/:id', // 不加问号，如果没带参数，是访问不了该页面的   ?的含义是表示该参数可传可不传，都可以进入
      component: () => import('@/views/employees/detail.vue'),
      hidden: true,
      meta: {
        title: '员工详情'
      }
    },
    {
      path: 'print/:id',
      component: () => import('@/views/employees/print.vue'),
      hidden: true,
      meta: {
        title: '员工打印'
      }
    }
  ]
}
