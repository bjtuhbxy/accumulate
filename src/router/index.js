import Router from 'vue-router'
import Hello from '../view/hello.vue'
import StepAnimation from '../view/SetpAnimation'

export default new Router({
  routes: [
    {
      path: '/',
      component : Hello
    },
    {
      path: '/step-animation',
      component: StepAnimation
    }
  ],
  mode: "hash"
})