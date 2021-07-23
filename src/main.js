import Vue from 'vue'
import Router from 'vue-router'
import router from './router/index'
import App from './App.vue'
import demo from './live-ui/packages/demo/index.js'
Vue.use(Router)
Vue.use(demo)

Vue.config.productionTip = false

window.vue = new Vue({
  render: h => h(App),
  router
}).$mount('#app')
