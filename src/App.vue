<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view/>
    </div>
  </a-config-provider>
</template>
<script>
  import zhCN from 'ant-design-vue/es/locale/zh_CN'
  import moment from 'moment'
  import 'moment/locale/zh-cn'
  import enquireScreen from '@/utils/device'
  import { mixinDevice } from '@/utils/mixin.js'

  moment.locale('zh-cn')

  export default {
    data() {
      return {
        locale: zhCN
      }
    },
    mixins: [mixinDevice],
    created() {
      const that = this
      enquireScreen(deviceType => {
        // tablet
        if (deviceType === 0) {
          that.$store.commit('TOGGLE_DEVICE', 'mobile')
        } else if (deviceType === 1) {
          // mobile
          that.$store.commit('TOGGLE_DEVICE', 'mobile')
        } else {
          that.$store.commit('TOGGLE_DEVICE', 'desktop')
        }

      })
    },
    mounted() {
      // 如果设备手机，重定向到手机端
      if (this.isMobile()) {
        window.open(window._CONFIG['mobileURL'],'_self')
      }
    },
    methods: {}
  }
</script>
<style lang="less">
</style>
