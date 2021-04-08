<template>
  <div id="financialAddBrandModal">
    <a-modal
      :footer="null"
      title="增加商标"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      width="870px"
      :maskClosable="false">
      <a-spin :spinning="loading.spinning" size="large">
        <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol" class="my-model" ref="ruleForm">
          <a-form-model-item label="申请号" prop="dataId">
            <a-row type="flex" align="middle">
              <a-col class="gutter-row" :span="20">
                <a-input v-model="form.dataId"/>
              </a-col>
              <a-col class="gutter-row" :span="4">
                <a-button
                  type="primary"
                  class="my-search"
                  tabindex="-1"
                  @click="searchBrand">查询
                </a-button>
              </a-col>
            </a-row>
          </a-form-model-item>

          <a-form-model-item label="商标">
            <div v-if="item.logoUrl" class="my-img">
              <el-image
                class="my-brand-img"
                :src="item.logoUrl"
                fit="contain"></el-image>
            </div>
          </a-form-model-item>
          <a-form-model-item label="商标名称">
            <a-input :disabled="true" v-model="item.name"></a-input>
          </a-form-model-item>
          <a-form-model-item label="商标类别">
            <a-input :disabled="true" v-model="item.typeCodeName"></a-input>
          </a-form-model-item>
          <a-form-model-item label="申请日期">
            <a-input :disabled="true" v-model="item.createDate"></a-input>
          </a-form-model-item>
          <a-form-model-item label="注册公告日期">
            <a-input :disabled="true" v-model="item.registerDate"></a-input>
          </a-form-model-item>
          <a-form-model-item label="法律状态">
            <a-input :disabled="true" v-model="item.processName"></a-input>
          </a-form-model-item>
          <a-form-model-item label="权利人">
            <a-input :disabled="true" v-model="item.applicant"></a-input>
          </a-form-model-item>

        </a-form-model>
        <a-row class="my-btn-group">
          <a-button class="cannel-btn" @click="handleCancel">取消</a-button>
          <a-button class="import-btn" @click="handleOk" type="danger" :disabled="JSON.stringify(item) === '{}'">
            确定
          </a-button>
        </a-row>
      </a-spin>
    </a-modal>
  </div>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'

  export default {
    name: 'FinancialAddBrandModal',
    data() {
      return {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
        visible: false,
        confirmLoading: false,

        url: '/pledge/portalPledgeTrademark/searchByDataId',
        loading: {
          spinning: false
        },
        form: {
          dataId: ''
        },

        item: {}
      }
    },
    methods: {
      searchBrand() {
        if (this.form.dataId === '') {
          this.$message.warning('请先输入商标申请号')
          return false
        }
        this.loadData()
      },
      async loadData() {
        this.loading.spinning = true
        const res = await getActionUpdateKeyword(this.url, this.form)
        if (res.success) {
          console.info(res)
          console.info('hahah')
          if (res.result.records.length === 0) {
            this.$message.warning('这个商标申请号没有查询到相关数据')
          } else {
            this.item = res.result.records[0]
          }
        } else {
          this.$message.error(res.message)
        }
        this.loading.spinning = false
      },
      showModal() {
        this.visible = true
      },
      handleOk() {
        const arr = [this.item]
        this.$emit('func', arr)
        this.handleCancel()
      },
      handleCancel() {
        this.visible = false
        this.$refs.ruleForm.resetFields()
        this.item = {}
        this.loading.spinning = false
      }
    }
  }
</script>

<style scoped lang="less">
  #financialAddBrandModal {

  }

  /deep/ .ant-modal-title {
    text-align: center;
  }

  .my-btn-group {
    text-align: center;
    margin-top: 20px;
    .ant-btn {
      width: 100px;
      &:nth-child(1) {
        margin-right: 10px;
      }
      &:nth-child(2) {
        margin-left: 10px;
      }
    }
  }

  .my-model {
    .my-search {
      width: 100%;
    }
  }

  .my-brand-img {
    width: 100px;
    height: 100px;
  }
</style>