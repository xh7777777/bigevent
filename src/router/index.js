import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/register',
    component: () => import('@/views/register')
  },
  {
    path: '/',
    component: () => import('@/views/layout')
  }
]

const router = new VueRouter({
  routes
})

export default router
