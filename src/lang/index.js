// 多语言实力化文件
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookie from 'js-cookie'
import elementZH from 'element-ui/lib/locale/lang/zh-CN' // 中文包
import elementEN from 'element-ui/lib/locale/lang/en' // 英文包
import customZH from './zh' // 自定义语言包，自己项目写的
import customEN from './en' // 自定义语言包
Vue.use(VueI18n)
export default new VueI18n({
  locale: Cookie.get('language') || 'zh', // 指的是当前多语言的类型，随意定义的字符串  中文zh    英文en
  // 指的是当前语言包
  messages: {
    zh: {
      ...elementZH,
      ...customZH
    },
    en: {
      ...elementEN,
      ...customEN
    }
  }
})
