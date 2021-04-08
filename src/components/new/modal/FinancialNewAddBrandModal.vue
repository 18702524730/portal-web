<template>
  <div id="financialNewAddBrandModal">
    <a-modal
      :footer="null"
      title="按商标申请号搜索"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      width="870px"
      :maskClosable="false">
      <a-spin :spinning="loading.spinning" size="large">
        <a-form-model :model="formParam" ref="ruleForm" :label-col="labelCol" :wrapper-col="wrapperCol"
                      class="my-tow-model">
          <a-form-model-item label="商标申请号" prop="dataId">
            <a-textarea :rows="5" v-model="formParam.dataId" placeholder="您可以输入商标申请号进行查询，多个商标以英文逗号,隔开"></a-textarea>
          </a-form-model-item>
          <a-form-model-item :wrapper-col="{ span: 20, offset: 4 }">
            <a-row type="flex" justify="center">
              <a-col :span="12" class="col-btn">
                <a-button type="primary" @click="searchInputPatent">确认</a-button>
              </a-col>
              <a-col :span="12" class="col-btn">
                <a-button @click="handleCancel">取消</a-button>
              </a-col>
            </a-row>
          </a-form-model-item>
        </a-form-model>
      </a-spin>
    </a-modal>

    <a-modal v-model="visible2" title="导入结果提示" @cancel="promptBtn">
      <template slot="footer">
        <a-button @click="promptBtn">取消</a-button>
      </template>
      <a-row :gutter="12" class="my-success-row">
        <a-col :span="5">
          导入成功：
        </a-col>
        <a-col :span="19">
          <a-row>
            {{successArr.length}}条
          </a-row>
          <a-row>
            {{successArr.join(',')}}
          </a-row>
        </a-col>
      </a-row>

      <a-row :gutter="12">
        <a-col :span="5">
          导入失败：
        </a-col>
        <a-col :span="19">
          <a-row>
            {{failArr.length}}条
          </a-row>
          <a-row>
            {{failArr.join(',')}}
          </a-row>
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'

  export default {
    name: 'FinancialNewAddBrandModal',
    data() {
      return {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
        visible: false,
        confirmLoading: false,

        url: '/pledge/portalPledgeTrademark/searchByDataId',
        loading: {
          spinning: false
        },

        formParam: {
          dataId: ''
        },
        visible2: false,
        allArr: [],
        successArr: [],
        failArr: [],
        inputData: []
      }
    },
    methods: {
      showModal() {
        this.visible = true
      },
      searchInputPatent() {
        this.formParam.dataId = this.formParam.dataId.replace(/\s+/g, '')

        if (this.formParam.dataId) {
          const arr = this.formParam.dataId.split(/[,，]/g)
          if (arr.length > 10) {
            this.$message.warning('最多输入10个商标申请号')
            return false
          }
          this.loadInputData(this.formParam)
        } else {
          this.$message.warning('请先输入商标申请号')
        }
      },
      async loadInputData(param) {
        this.loading.spinning = true
        this.confirmLoading = true
        const res = await getActionUpdateKeyword(this.url, param)
        if (res.success) {
          this.inputData = res.result.records
          if (this.inputData.length > 0) {
            this.allArr = []
            const arr = this.formParam.dataId.replace(/\s+/g, '').split(/[,，]/g)
            for (const item of arr){
              if (item === ""){
                continue
              }
              this.allArr.push(item)
            }
            for (const a of this.inputData) {
              if (!this.successArr.includes(a.dataId)) {
                this.successArr.push(a.dataId)
              }
            }
            this.failArr = this.allArr.filter(item => !this.successArr.includes(item))
            this.importBrand()
          } else {
            this.$message.warning('没有查询到相关数据')
          }
        } else {
          this.$message.error("请检查输入的商标申请号格式是否正确，多个商标以英文逗号,隔开")
        }
        this.loading.spinning = false
        this.confirmLoading = false
      },
      importBrand() {
        const arr = [...this.inputData]
        this.$emit('func', arr, false)
        this.loading.spinning = false
        this.handleCancel()
        this.visible2 = true
      },
      handleOk() {

      },
      handleCancel() {
        if (!this.loading.spinning) {
          this.visible = false
          this.$refs.ruleForm.resetFields()
        }
      },
      promptBtn() {
        this.visible2 = false
        this.allArr = []
        this.successArr = []
        this.failArr = []
      }
    }
  }
</script>

<style scoped lang="less">
  #financialNewAddBrandModal {

  }

  /deep/ .ant-modal-title {
    text-align: center;
  }

  .my-tow-model {
    .ant-form-item {
      margin-bottom: 12px;
    }
  }

  .col-btn {
    text-align: center;
    button {
      width: 50%;
    }
  }

  .my-success-row {
    margin-bottom: 20px;
  }


</style>