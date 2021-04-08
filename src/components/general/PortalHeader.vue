<template>
  <div id="portal-header">
    <iframe id="child" :src="userCenterUrl" scrolling="no" frameborder="0" marginheight="0" marginwidth="0"
            style="height: 0;position: absolute;z-index: 0;width: 1170px">
    </iframe>
    <iframe id="child2" :src="torchCenterUrl" scrolling="no" frameborder="0" marginheight="0" marginwidth="0"
            style="height: 0;position: absolute;z-index: 0;width: 1170px">
    </iframe>
    <div class="container">
      <a-row :gutter="16">
        <a-col :xs="24" :sm="24" :md="10" style="text-align: left" class="left-breadcrumb">
          <a-breadcrumb separator="|">
            <a-breadcrumb-item v-if="!state"><a @click.prevent="login">您好！<span style="color: #2f72d1">请登录</span></a>
            </a-breadcrumb-item>
            <!--<a-breadcrumb-item v-if="!state">-->
            <!--<a :href="registerUrl">注册</a>-->
            <!--</a-breadcrumb-item>-->
            <a-breadcrumb-item v-if="state">
              <span style="padding-right: 10px;">欢迎您，{{ realname }}</span>
              <a class="logout_title" @click.prevent="handleLogout">
                <span>&nbsp;退出登录</span>
              </a>
            </a-breadcrumb-item>
          </a-breadcrumb>
        </a-col>
        <a-col :xs="24" :sm="24" :md="14" style="text-align: right;" class="right-breadcrumb">
          <a-breadcrumb separator="|">
            <a-breadcrumb-item>
              <router-link :to="'/portal'">首页</router-link>
            </a-breadcrumb-item>
            <!--<a-breadcrumb-item v-if="!state">-->
            <!--<a :href="loginUrl" target="_self">用户中心</a>-->
            <!--&lt;!&ndash;<router-link target="_blank" :to="{path:'/customer'}">用户中心</router-link>&ndash;&gt;-->
            <!--</a-breadcrumb-item>-->
            <a-breadcrumb-item>
              <!--<router-link target="_blank" :to="{path:'/dashboard/analysis'}">用户中心</router-link>-->
              <a @click.prevent="judgeToCenter">用户中心
                <a-badge :count="msgTotal" style="font-size: 12px" :offset="[3,-3]" :overflowCount="99">
                </a-badge>
              </a>
            </a-breadcrumb-item>
            <!--<a-breadcrumb-item v-if="state && (post ==='2'|| post === 2)">-->
            <!--&lt;!&ndash;<router-link target="_blank" :to="{path:'/dashboard/personAanalysis'}">用户中心</router-link>&ndash;&gt;-->
            <!--</a-breadcrumb-item>-->
            <a-breadcrumb-item>
              <router-link :to="{name:'HelpCenter',query:{openKeys:'3'}}">帮助中心</router-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item>
              <router-link :to="{name:'HelpCenter',query:{openKeys:'4',itemKeys:'1'}}">关于我们</router-link>
            </a-breadcrumb-item>
          </a-breadcrumb>
        </a-col>
      </a-row>
    </div>
    <login-skip ref="loginModal" @func="updateState" :key-route="keyRoute" @message="updateCenter"></login-skip>
  </div>
</template>

<script>
  import LoginSkip from './LoginSkip'
  import { mapActions, mapGetters } from 'vuex'
  import { judgeState } from '@/utils/util'
  import { getActionUpdateKeyword, getAction } from '@/api/manage'
  import Vue from 'vue'
  import {
    USER_INFO, USER_NAME, ACCESS_TOKEN
  } from '@/store/mutation-types'
  import bus from '@/assets/eventBus'

  export default {
    name: 'PortalHeader',
    components: { LoginSkip },
    inject: ['reload'],
    props: {
      keyRoute: {
        type: String,
        default: ''
      }

    },
    data() {
      return {
        post: '1',
        state: false,
        registerUrl: window._CONFIG['registerUrl'],
        loginUrl: window._CONFIG['loginUrl'],
        timeIn: null,
        url: '/sys/checkToken',
        userCenterUrl: window._CONFIG['userCenterURL'] + '/portal/listener',
        torchCenterUrl: window._CONFIG['torchCenterUrl'] + '/torch/listener',
        realname: '',

        listCementByUser: '/sys/annountCement/listByUser',
        stopTimer: false,
        msg1Count: '100'
      }
    },
    created() {
      this.updateState()

      // 第一次渲染，判断是否处于登录状态
      this.postMessage(judgeState(), false)
    },
    computed: {
      msgTotal() {
        return parseInt(this.msg1Count)
      }
    },
    mounted() {
      const that = this
      window.addEventListener('storage', that.loadingSetting)
      // window.addEventListener('storage', that.postMe)
      // 增加一个触发 页面登录消息刷新的操作
    },
    beforeDestroy() {
      // 组件销毁前需要解绑事件。否则会出现重复触发事件的问题
      const that = this
      window.removeEventListener('storage', that.loadingSetting)
    },
    methods: {
      ...mapActions(['Logout']),
      ...mapGetters(['nickname', 'avatar', 'userInfo']),
      timerFun() {
        this.stopTimer = false
        const myTimer = setInterval(() => {
          // 停止定时器
          if (this.stopTimer === true) {
            clearInterval(myTimer)
            return
          }
          this.loadMseData()
        }, 60000 * 5)
      },
      loadMseData() {
        try {
          // 获取系统消息
          getActionUpdateKeyword(this.listCementByUser).then((res) => {
            if (res.success) {
              this.msg1Count = res.result.unreadTotal
            }
          }).catch(error => {
            console.log('系统消息通知异常', error)
            this.stopTimer = true
          })
        } catch (err) {
          this.stopTimer = true
        }
      },
      headRefresh() {
        this.judgeState()
        this.reload()
      },
      postMessage(type, init = true) {
        if (init) {
          // 登录和退出登录需要触发
          bus.$emit('loginOrLogoutEmit')
        }
        const iframe = document.getElementById('child')
        let token = { token: Vue.ls.get(ACCESS_TOKEN) }
        if (iframe) {
          if (type) {
            iframe.contentWindow.postMessage(token, this.userCenterUrl)
          } else {
            // 退出登录
            token = { token: false }
            iframe.contentWindow.postMessage(token, this.userCenterUrl)
          }
        }
        const iframe2 = document.getElementById('child2')
        if (iframe2) {
          if (type) {
            iframe2.contentWindow.postMessage(token, this.torchCenterUrl)
          } else {
            // 退出登录
            token = { token: false }
            iframe2.contentWindow.postMessage(token, this.torchCenterUrl)
          }
        }
      },
      loadingASetting(e) {
        if (e.origin !== this.userCenterUrl) {
          return
        }
        if (e.data.token) {
          // 登录
          getAction('/zscq/portal/getUserInfoByToken', {
            token: e.data.token
          }).then(res => {
            if (res.success) {
              const userInfo = res.result.userInfo
              Vue.ls.set(USER_INFO, userInfo, 7 * 24 * 60 * 60 * 1000)
              // store.commit('SET_INFO', userInfo);
              const result = res.result
              Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
              Vue.ls.set(USER_NAME, userInfo['username'], 7 * 24 * 60 * 60 * 1000)
              Vue.ls.set(USER_INFO, userInfo, 7 * 24 * 60 * 60 * 1000)
              Vue.ls.set(window._CONFIG['roleCookieName'], result['roleInfo'], 7 * 24 * 60 * 60 * 1000)
            } else {
              this.$message.error('网络可能出现问题，请重新访问！')
            }
          })
        } else if (e.data.token === false) {
          // 退出登录
          this.Logout({}).then(() => {
            this.judgeState()
            this.reload()
          }).catch(err => {
            this.$message.error({
              title: '错误',
              description: err.message
            })
          })
        }
      },
      async checkToken() {
        try {
          const res = await getActionUpdateKeyword(this.url)
          if (res.code === 200) {
            return true
          } else {
            this.cleanLogout()
          }
        } catch (e) {
          return false
        }
      },
      cleanLogout() {
        this.Logout({}).then(() => {
          this.judgeState()
          this.reload()

        }).catch(err => {
          this.$message.error({
            title: '错误',
            description: err.message
          })
        })
      },
      judgeToCenter() {
        if (this.state) {
          // 登录了
          const token = Vue.ls.get(ACCESS_TOKEN)
          const newUrl = window._CONFIG['userCenterToURL'] + '?token=' + token
          window.open(newUrl, '_self')
        } else {
          this.$refs.loginModal.showModalGoHome(true)
        }
      },
      loadingSetting(e) {
        const that = this
        if (e.key === 'pro__Access-Token') {
          that.judgeState()
          that.reload()
        }
      },
      login() {
        this.$refs.loginModal.showModal(true)
      },
      loginNotReload() {
        this.$refs.loginModal.showModal(false)
      },
      loginAndGoto(gotoRouter, gotuQuery) {
        this.$refs.loginModal.showModalAndGoto(gotoRouter, gotuQuery)
      },
      handleLogout() {
        const that = this

        that.$confirm({
          title: '提示',
          content: '真的要注销登录吗 ?',
          zIndex: 9999999999,
          onOk() {
            return that.Logout({}).then(() => {
              that.judgeState()
              that.reload()
              // 移除本地缓存的用户信息
              Vue.ls.remove(USER_INFO)
              that.postMessage(false)
            }).catch(err => {
              that.$message.error({
                title: '错误',
                description: err.message
              })
            })
          },
          onCancel() {
          }
        })
      },
      updateCenter() {
        this.postMessage(true)
      },
      updateState() {
        this.judgeState()
      },
      judgeState() {
        const uinfo = Vue.ls.get(USER_INFO)
        if (uinfo) {
          this.realname = uinfo.orgName ? uinfo.orgName : uinfo.realname
        }

        this.state = judgeState()
        if (this.userInfo() !== null) {
          this.post = this.userInfo().post
        }
      }
    },
    watch: {
      state: {
        handler(data) {
          debugger
          if (data) {
            this.loadMseData()
            this.timerFun()
          } else {
            this.stopTimer = true
            this.msg1Count = '0'
          }
        },
        immediate: true
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../main";

  #portal-header {
    .main-css();
    text-align: center;
    color: #333333;
    font-size: 15px;
    background-color: #f5f6f7;
    height: auto;

    .ant-breadcrumb {
      line-height: 40px !important;

      a:hover {
        color: @main-color;
      }
    }

    .left-breadcrumb {
      span {
        font-size: 15px;
      }
    }

    .right-breadcrumb {
      span {
        font-size: 13px;
      }

      /deep/ .ant-breadcrumb-separator {
        margin: 0 17px;
      }
    }

    .ant-breadcrumb-link a,
    .ant-breadcrumb-link {
      color: rgba(0, 0, 0, 0.45);
    }
  }
</style>
