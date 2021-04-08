<template>
  <a-modal
    :visible="visible"
    :footer="null"
    :width="350"
    @cancel="handleCancel"
  >
    <template slot="title">
      <p>提示</p>
    </template>
    <div class="my-div">
      <p>
        <a-icon type="exclamation-circle" :style="{'fontSize':'50px'}" theme="twoTone" twoToneColor="#e36844"/>
      </p>
      <p>
        <span style="font-size: 14px;">{{message}}</span>
      </p>
      <p>
        <a-button type="primary" style="width: 120px" @click="toPromat" :disabled="loginBtn">立即认证</a-button>
      </p>
    </div>
  </a-modal>
</template>

<script>
  import {
    ACCESS_TOKEN
  } from '@/store/mutation-types'
  import Vue from 'vue'

  export default {
    name: 'CertificationModal',
    props: {
      message: {
        type: String,
        default: '您还未完成企业主体信息认证,请先进行认证'
      },
      code: {
        type: Number,
        default: 1
      }
    },
    data() {
      return {
        visible: false,
        loginBtn: false
      }
    },
    methods: {
      toPromat() {
        this.loginBtn = true

        const token = Vue.ls.get(ACCESS_TOKEN)
        const path = '/person/partInfo'
        const newUrl = window._CONFIG['userCenterToURL'] + '?token=' + token + '&redirectUrl=' + path
        window.open(newUrl)
        // const routeData = this.$router.resolve({
        //   path: '/person/partInfo',
        //   query: {
        //     codeStatus: this.code
        //   }
        // })
        // window.open(routeData.href, '_blank')
        this.loginBtn = false
      },
      showModal() {
        this.visible = true
      },
      handleCancel() {
        this.close()
      },
      close() {
        this.$emit('close')
        this.visible = false
        this.loginBtn = false
      }
    }
  }
</script>

<style scoped lang="less">
  p {
    text-align: center;
    margin-bottom: 0;
    font-size: 20px;
    font-weight: 900;
  }

  .my-div {
    text-align: center;
    p {
      margin-bottom: 1em;
    }
  }
</style>