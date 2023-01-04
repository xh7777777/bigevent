import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
Vue.use(VueRouter)
const whiteList = [ // 无需登录就能访问的路由地址
  '/login',
  '/register'
]
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
    component: () => import('@/views/layout'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const token = store.state.token
  if (token) { // 已经登陆了
    if (store.state.userInfo) {
      store.dispatch('initUserInfo')
    }
    next()
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
export default router
