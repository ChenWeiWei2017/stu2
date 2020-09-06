import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import cookie from './plugins/cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

Vue.config.productionTip = false

new Vue({
  router,
  store,
  // vue-cookie 可以在Vue中通过this.$cookie.set(),this.$cookie.get()操作cookie
  cookie,
  render: h => h(App)
}).$mount('#app')
