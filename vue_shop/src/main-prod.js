import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 配置成 externals 节点，减小体积
// import './plugins/element.js'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
import axios from 'axios'
import TreeTable from 'vue-table-with-tree-grid'
// 富文本编辑器相关文件
import VueQuillEditor from 'vue-quill-editor'

// 导入NProgress 的 js 和 CSS 包
import NProgress from 'nprogress'

// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

axios.interceptors.request.use(config => {
  // 在 request 拦截器中，展示进度条 - NProgress.start()
  NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 最后必须返回config
  return config
})

// 在 request 拦截器中，隐藏进度条 - NProgress.done()
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})

Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.component('tree-table', TreeTable)
Vue.use(VueQuillEditor)

Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
