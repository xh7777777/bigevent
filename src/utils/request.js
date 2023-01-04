import axios from 'axios'
import store from '@/store'
const myAxios = axios.create({
  baseURL: 'http://big-event-vue-api-t.itheima.net'
})

myAxios.interceptors.request.use(function (config) {
  if (store.state.token) {
    config.headers.Authorization = store.state.token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

export default myAxios
