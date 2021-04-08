<template>
  <iframe v-if="timeUrl !== ''" class="my-frame" id="myIframe" :src="timeUrl" frameborder="0" width="100%"
          scrolling="no" style="background-color: #fff;"></iframe>
</template>

<script>
  import { mapGetters } from 'vuex'
  import bus from '@/assets/eventBus'
  import { judgeState } from '@/utils/util'

  export default {
    name: 'IntellectualPropertySearch',
    inject: ['loginNotReload'],
    props: {
      sbUrl: {
        type: String,
        default: 'http://xm.xmipop.com'
      },
      base: {
        type: String,
        default: '/#/search/comsearch/zlsearch'
      }
    },
    data() {
      return {
        changeBase: this.base
      }
    },
    created() {

    },
    watch: {
      '$route'(to, from) {
        console.info(to)
        let base = '/#/search/comsearch/zlsearch'
        switch (to.name) {
          case 'PatentSearchShiBei':
            base = '/#/search/comsearch/zlsearch'
            break
          case 'BrandSearchShiBei':
            base = '/#/search/comsearch/sbsearch'
            break
          case 'LawSearchShibei':
            base = '/#/search/comsearch/cjsearch'
            break
          default:
            this.$router.push({ path: '/portal' })
            break
        }

        this.changeBase = base
      }
    },
    mounted() {
      // 在外部vue的window上添加postMessage的监听，并且绑定处理函数handleMessage
      const that = this
      window.addEventListener('message', that.loadSettings)

      bus.$on('transmitData', function() {
        that.transmitData()
      })
    },
    beforeDestroy() {
      // 组件销毁前需要解绑事件。否则会出现重复触发事件的问题
      bus.$off('transmitData')
      const that = this
      window.removeEventListener('message', that.loadSettings)
    },
    methods: {
      ...mapGetters(['userInfo']),
      loadSettings(event) {
        const that = this
        const iframe = document.getElementById('myIframe')
        if (iframe) {
          if (event.data === 'login') {
            // 判断是否已经登录
            that.transmitData()
          } else if (event.data && event.data.indexOf && event.data.indexOf('openTab') > -1) {
            const url = event.data.replace('openTab', '')
            const newpage = this.$router.resolve({
              name: 'SearchDetail',
              query: {
                url: url
              }
            })
            window.open(newpage.href, '_blank')
          } else {
            iframe.height = event.data
          }
        }
      },
      transmitData() {
        const that = this
        const iframe = document.getElementById('myIframe')
        if (judgeState()) {
          const msg = { type: 'userId', userId: that.userInfo().id }
          const sbUrl = that.sbUrl
          iframe.contentWindow.postMessage(msg, sbUrl)
        } else {
          that.loginNotReload()
        }
      }
    },
    computed: {
      timeUrl() {
        if (this.sbUrl === '') {
          return ''
        }
        const url = this.sbUrl + this.changeBase
        let userId = ''
        if (judgeState()) {
          userId = this.userInfo().id
        }
        const _t = Date.parse(new Date())
        return url + '?_t=' + _t + '&userId=' + userId

      }
    }
  }
</script>

<style scoped lang="less">
  .my-frame {
    min-height: 500px;
  }
</style>