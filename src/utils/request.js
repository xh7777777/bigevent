import axios from 'axios'
import store from '@/store'
import router from '@/router'
const myAxios = axios.create({
  baseURL: 'http://big-event-vue-api-t.itheima.net'
})
// 请求拦截器 请求时统一带上token
myAxios.interceptors.request.use(function (config) {
  if (store.state.token) {
    config.headers.Authorization = store.state.token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截器，判断token是否已经过期了
myAxios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response.status === 401) {
    // 被动退出登录状态
    store.commit('updateToken', '')
    store.commit('updateUserInfo', '')
    router.push('/login')
  }
  return Promise.reject(error)
})
export default myAxios
