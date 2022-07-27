import Vue from 'vue'
import App from './App.vue'

// 引入vant
import Vant from 'vant';
import 'vant/lib/index.css';
import '@/assets/font/iconfont.css'

// 引入路由
import router from './router'
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
