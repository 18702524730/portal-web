<template>
  <div style="position: fixed; bottom: 80px; right: 30px; opacity: 1; cursor: pointer;z-index: 99999;">
    <a-row style="margin-bottom: 2px;">
      <a-back-top>
        <div style="position: fixed; bottom: 268px; right: 30px; opacity: 1; cursor: pointer;z-index: 99999;">
          <img src="@/assets/images/general/returnTop.png">
        </div>
      </a-back-top>
    </a-row>
    <a-row style="margin-bottom: 2px;">
      <img
        src="@/assets/images/general/contact.png" id="WS-SHOW-CHAT">
    </a-row>
    <a-row style="margin-bottom: 2px;">
      <img
        src="@/assets/images/general/opinion.png" @click="aBtn('OpinionAdvice','2')">
    </a-row>
    <a-row style="margin-bottom: 2px;">
      <img
        src="@/assets/images/general/complain.png" @click="aBtn('OnlineComplaint','1')">
    </a-row>
  </div>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'
  import { judgeState } from '@/utils/util'
  import { mapGetters } from 'vuex'
  import bus from '@/assets/eventBus'

  export default {
    name: 'AffixButton',
    inject: ['headLogin'],
    data() {
      return {
        username: '游客',
        chatUrl: ''
      }
    },
    created() {
      getActionUpdateKeyword('/zscq/portal/getImurl').then((res) => {
        this.chatUrl = res.imUrl + '/#/imclient?username='
      })
    },
    mounted() {
      this.loginOrLogoutEmitNot()
      const that = this
      bus.$on('loginOrLogoutEmit', function() {
        that.loginOrLogoutEmit()
      })
    },
    beforeDestroy() {
      // 组件销毁前需要解绑事件。否则会出现重复触发事件的问题
      bus.$off('loginOrLogoutEmit')
    },
    methods: {
      ...mapGetters(['userInfo']),
      loginOrLogoutEmitNot() {
        // 先清除缓存
        // 判断之前先隐藏
        if (!judgeState()) {
          // eslint-disable-next-line
          whisperChat.init()
        } else {
          const user = this.userInfo()
          let avatar = '/static/common/images/kefu/2.png'
          if (window._CONFIG['prodEnv']) {
            avatar = '/chat/static/common/images/kefu/2.png'
          }
          if (user.avatar) {
            avatar = window._CONFIG['imgDomainURL'] + '/' + user.avatar
          }
          // eslint-disable-next-line
          whisperChat.init({
            uid: user.id,
            uName: user.realname,
            avatar: avatar
          })
        }
        // eslint-disable-next-line
        if (whisperChat && whisperChat.hideChatDiv) {
          // eslint-disable-next-line
          whisperChat.hideChatDiv()
        }
      },
      loginOrLogoutEmit() {
        // 先清除缓存
        const arr = ['avatar', 'uid', 'whisper_referrer', 'uName']
        for (const a of arr) {
          localStorage.removeItem(a)
        }
        // 判断之前先隐藏
        if (!judgeState()) {
          // eslint-disable-next-line
          whisperChat.init({
            uid: 'TEST-UID',
            uName: 'TEST-UNAME',
            avatar: 'TEST-AVATAR'

          })
        } else {
          const user = this.userInfo()
          let avatar = '/static/common/images/kefu/2.png'
          if (window._CONFIG['prodEnv']) {
            avatar = '/chat/static/common/images/kefu/2.png'
          }
          if (user.avatar) {
            avatar = window._CONFIG['imgDomainURL'] + '/' + user.avatar
          }
          // eslint-disable-next-line
          whisperChat.init({
            uid: user.id,
            uName: user.realname,
            avatar: avatar
          })
        }
        // eslint-disable-next-line
        if (whisperChat && whisperChat.hideChatDiv) {
          // eslint-disable-next-line
          whisperChat.hideChatDiv()
        }
      },
      rowClick() {
        this.$router.push({ name: 'HelpCenter', query: { openKeys: '4', itemKeys: '2' } })
      },
      aBtn(key, type) {
        if (!judgeState()) {
          this.$message.warning('请先进行登录！')
          this.headLogin('goto', { name: key, params: { type: type } })
        } else {
          this.$router.push({ name: key, params: { type: type } })
        }
      }
    }
  }
</script>

<style scoped lang="less">

</style>