import Layout from '@/layout'
export default {
  path: '/setting',
  name: 'settings',
  component: Layout,
  children: [
    {
      path: '',
      name: 'settings',
      component: () => import('@/views/setting'),
      meta: {
        title: '公司设置',
        icon: 'iconfont icon-gerenzhongxin'
      }
    }
  ]
}
