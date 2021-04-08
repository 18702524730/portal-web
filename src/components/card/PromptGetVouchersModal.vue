<template>
  <a-modal
    :visible="visible"
    :footer="null"
    :width="350"
    @cancel="handleCancel"
  >
    <template slot="title">
      <p v-if="result.success">领取成功</p>
      <p v-else>领取失败</p>
    </template>
    <div class="my-div" v-if="result.success">
      <p>
        <a-icon type="check-circle" :style="{'fontSize':'50px'}" theme="twoTone" twoToneColor="#018dd6"/>
      </p>
      <p style="margin-bottom: 0.5em">
        <span style="font-size: 18px;">恭喜您领取成功</span>
      </p>
      <p class="content-div">
        <span>获得小微企业服务券<span style="color: #ff3300;padding-left: 5px;padding-right: 5px">{{result.result.availableAmount}}</span>元</span>
      </p>
      <p class="content-div">
        <a-button type="primary" @click="closeModal">确认</a-button>
      </p>
    </div>

    <div class="my-div" v-else>
      <p>
        <a-icon type="close-circle" :style="{'fontSize':'50px'}" theme="twoTone" twoToneColor="#eb4826"/>
      </p>
      <p>
        <span style="font-size: 18px;">领取服务券失败</span>
      </p>
      <p class="content-div">
        <span>{{result.message}}</span>
      </p>
    </div>
  </a-modal>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'
  import bus from '@/assets/eventBus'

  export default {
    name: 'PromptGetVouchersModal',
    props: {
      userId: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        visible: false,
        url: '/zscq/portal/voucher/receiveVoucher',
        result: {}
      }
    },
    methods: {
      getVouchers() {
        const param = {
          userId: this.userId
        }
        getActionUpdateKeyword(this.url, param).then((res) => {
          this.result = res
          this.visible = true
          this.$emit('func')
        })
      },
      handleCancel() {
        this.close()
      },
      close() {
        this.$emit('close')
        bus.$emit('flushPage')
        this.visible = false
      },
      closeModal() {
        this.close()
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

  .content-div {
    color: #999999;
    font-size: 14px;
    font-weight: normal;
  }
</style>