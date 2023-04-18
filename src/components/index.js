import PageTools from './PageTools'
import UploadExcel from './UploadExcel'
import imageUpload from './imageUpload'
import Print from 'vue-print-nb'
import ScreenFull from './ScreenFull'
import LangSelect from './lang'
import TagsView from './TagsView'
export default {
  install (Vue) {
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel)
    Vue.component('imageUpload', imageUpload)
    Vue.use(Print) // 注册打印组件
    Vue.component('ScreenFull', ScreenFull)
    Vue.component('LangSelect', LangSelect)
    Vue.component('TagsView', TagsView)
  }
}
