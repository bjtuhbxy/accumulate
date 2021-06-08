import Vue from 'vue'
import App from './App.vue'
import demo from './live-ui/packages/demo/index.js'
Vue.use(demo)

Vue.config.productionTip = false

window.vue = new Vue({
  render: h => h(App),
}).$mount('#app')
