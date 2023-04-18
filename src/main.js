import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './permission'
import Components from './components'
import * as filters from '@/filters' // 引入全部的过滤器
import CheckPermission from './mixin/checkPermission'
import i18n from '@/lang'
Vue.use(ElementUI, { i18n: (key, value) => i18n.t(key) })
Vue.use(Components)
// 全局混入检查对象
Vue.mixin(CheckPermission)
Vue.config.productionTip = false
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]) // 注册自定义过滤器
})
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
