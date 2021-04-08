import Vue from 'vue'
import { USER_INFO } from '@/store/mutation-types'

const getters = {
  device: state => state.user.device,
  token: state => state.user.token,
  avatar: state => {
    state.user.avatar = Vue.ls.get(USER_INFO).avatar
    return state.user.avatar
  },
  username: state => state.user.username,
  nickname: state => {
    state.user.realname = Vue.ls.get(USER_INFO).realname
    return state.user.realname
  },
  userInfo: state => {
    state.user.info = Vue.ls.get(USER_INFO)
    return state.user.info
  }
}

export default getters