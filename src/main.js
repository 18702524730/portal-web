import Vue from 'vue'
import App from './App.vue'
import Storage from 'vue-ls'
import router from './router'
import store from './store'
import './components/sindex'
import './components/index'
import config from '@/defaultSettings'
// import 'element-ui/lib/theme-chalk/index.css'
import './utils/filter'
import './utils/sebeAxios'
import './utils/sbAxios'
import '@/permission'

import scroll from 'vue-seamless-scroll'
Vue.use(scroll)

Vue.config.productionTip = false
Vue.use(Storage, config.storageOptions)
var _hmt = _hmt || []; // eslint-disable-line
window._hmt = _hmt;  // eslint-disable-line
(function () {  // eslint-disable-line
      var hm = document.createElement("script")
      hm.src = 'https://hm.baidu.com/hm.js?610320180755906ddebde9fa0f6518c4'
      var s = document.getElementsByTagName("script")[0]
      s.parentNode.insertBefore(hm, s)
})()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
