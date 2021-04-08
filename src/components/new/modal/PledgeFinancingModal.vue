<template>
  <div id="pledgeFinancingModal">
    <a-modal
      :footer="null"
      title="产品详情"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      width="670px"
    >
      <a-descriptions bordered :column="1">
        <a-descriptions-item label="产品名称：">
          {{item.name}}
        </a-descriptions-item>
        <a-descriptions-item label="最高额度：">
          {{item.maxQuota}}万
        </a-descriptions-item>
        <a-descriptions-item label="产品特点：">
          {{item.characteristic}}
        </a-descriptions-item>
        <a-descriptions-item label="产品简介：">
          {{item.remark}}
        </a-descriptions-item>
        <a-descriptions-item label="适用用户：">
          {{item.applyUser}}
        </a-descriptions-item>
      </a-descriptions>


      <a-row type="flex" justify="center">
        <a-col :span="4" class="my-btn">
          <a-button type="primary" @click="handleCancel" size="large">
            关闭
          </a-button>
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'

  export default {
    name: 'PledgeFinancingModal',
    data() {
      return {
        confirmLoading: false,
        visible: false,
        url: '/zscq/portal/getDetailById',
        item: {}
      }
    },
    methods: {
      showModal(item) {
        this.visible = true
        this.item = item
        console.info(this.item)
      },
      handleOk() {

      },
      handleCancel() {
        this.visible = false
      },
      async loadData(id) {
        const res = await getActionUpdateKeyword(this.url, { id: id })
        console.info(res)
      }
    }
  }
</script>

<style scoped lang="less">
  #pledgeFinancingModal {

  }

  /deep/ .ant-modal-title {
    text-align: center;
  }
  /deep/ .ant-descriptions-row{
    th{
      width: 20%;
    }
  }
  .my-btn{
    margin-top: 20px;
    .ant-btn{
      width: 100%;
    }
  }
</style>