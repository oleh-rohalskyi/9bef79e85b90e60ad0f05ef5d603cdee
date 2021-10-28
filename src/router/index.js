import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: 'Packages',
    component: () => import('../views/Packages.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
