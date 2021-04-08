<template>
  <div id="supplyDemandPublish">
    <iframe v-if="timeUrl !== '' && render" class="my-frame" id="myIframe" :src="timeUrl" frameborder="0" width="100%"
            scrolling="no" style="background-color: #fff;"></iframe>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { ACCESS_TOKEN } from '@/store/mutation-types'

  export default {
    name: 'SupplyDemandPublish',
    props: {
      path: {
        type: String,
        default: '/supply/project/add'
      },
      render: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      timeUrl() {
        const token = Vue.ls.get(ACCESS_TOKEN)
        const newUrl = window._CONFIG['userCenterToURL'] + '?token=' + token + '&redirectUrl=' + this.path

        return newUrl
      }
    }
  }
</script>

<style scoped lang="less">
  .my-frame {
    min-height: 500px;
  }
</style>