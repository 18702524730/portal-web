<template>
  <iframe id="myIframe" v-if="timeUrl !== ''" class="my-frame" :src="timeUrl" frameborder="0" width="100%" height="100%"
          scrolling="no" style="background-color: #fff;"></iframe>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { isLoginAndAdmin } from '@/utils/role'
  import { judgeState } from '@/utils/util'

  export default {
    name: 'ShiBeiPort',
    props: {
      sbUrl: {
        type: String,
        default: 'http://xm.xmipop.com'
      },
      base: {
        type: String,
        default: '/#/statistical/bigdata'
      }
    },
    data() {
      return {}
    },
    created() {

      if (!isLoginAndAdmin()) {
        this.$router.push({ path: '/portal' })
      }
    },
    methods: {
      ...mapGetters(['userInfo']),
      loadSettings(event) {
        const iframe = document.getElementById('myIframe')
        if (iframe) {
          if (event.data && event.data.indexOf && event.data.indexOf('openTab') > -1) {
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
      }
    },
    mounted() {
      const that = this
      // 在外部vue的window上添加postMessage的监听，并且绑定处理函数handleMessage
      window.addEventListener('message', that.loadSettings)
    },
    beforeDestroy() {
      const that = this
      window.removeEventListener('message', that.loaprocess.envdSettings)
    },
    computed: {
      timeUrl() {
        if (this.sbUrl === '') {
          return ''
        }
        const url = this.sbUrl + this.base
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