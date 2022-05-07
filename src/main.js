import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
Vue.use(VueQuillEditor)
import ZkTable from 'vue-table-with-tree-grid'
Vue.use(ZkTable)

// 导入 NProgress 包对应的js和css  NProgress是添加进度条效果
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 导入字体图标
import './assets/font/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'
import axios from 'axios'

// 配置请求根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
    // 在 request 拦截器中展示进度条 NProgress.start()
axios.interceptors.request.use(config => {
        NProgress.start()
            // 为请求头对象,添加Token验证的 Authorization 字段
        config.headers.Authorization = window.sessionStorage.getItem('token')
        return config //最后必须返回conflg
    })
    // 在response 拦截器中隐藏进度条  NProgress.done()
axios.interceptors.response.use(config => {
    NProgress.done()
    return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')