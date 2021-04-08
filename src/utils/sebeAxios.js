import axios from 'axios'
import Vue from 'vue'
import { notification } from 'ant-design-vue'
import { USER_INFO, ACCESS_TOKEN } from '@/store/mutation-types'
import store from '@/store'
import rootConfig from '@config/hostConfig.js'
// 创建 axios 实例
const bUrl = rootConfig.rootUrl

const sebeService = axios.create({
  baseURL: bUrl,
  timeout: 120000
})
const sebeService2 = axios.create({
    baseURL: bUrl,
    timeout: 120000,
    method: 'download',
    responseType: 'blob',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
})
const err = (error) => {
    if (error.response) {
        const data = error.response.data
        const token = Vue.ls.get(ACCESS_TOKEN)
        switch (error.response.status) {
        case 403:
            notification.error({ message: '系统提示', description: '拒绝访问', duration: 4 })
            break
        case 500:
            if (token && data.message === 'Token失效，请重新登录') {
            store.dispatch('Logout').then(() => {
                window.location.reload()
            })
            }
            break
        case 404:
            notification.error({ message: '系统提示', description: '很抱歉，资源未找到!', duration: 4 })
            break
        case 504:
            notification.error({ message: '系统提示', description: '网络超时' })
            break
        case 401:
            notification.error({ message: '系统提示', description: '未授权，请重新登录', duration: 4 })
            if (token) {
            store.dispatch('Logout').then(() => {
                setTimeout(() => {
                window.location.reload()
                }, 1500)
            })
            }
            break
        default:
            // notification.error({
            // message: '系统提示',
            // description: data.message,
            // duration: 4
            // })
            break
        }
    }
    return Promise.reject(error)
}
sebeService.interceptors.request.use(config => {
  const uinfo = Vue.ls.get(USER_INFO)
  const uid = uinfo && uinfo.id
  config.headers['userId'] = uid || ''
  return config
}, (error) => {
  return Promise.reject(error)
})
sebeService2.interceptors.request.use(config => {
    const uinfo = Vue.ls.get(USER_INFO)
    const uid = uinfo && uinfo.id
    config.headers['userId'] = uid || ''
    return config
}, (error) => {
    return Promise.reject(error)
})

// response interceptor
sebeService.interceptors.response.use((response) => {
  return response.data
}, err)
sebeService2.interceptors.response.use((response) => {
    return response
}, err)
Vue.prototype.$shttp = sebeService
Vue.prototype.$xhttp = sebeService2

export default { sebeService,sebeService2 }