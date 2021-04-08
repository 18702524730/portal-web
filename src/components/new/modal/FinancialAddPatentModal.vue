<template>
  <div id="financialAddPatentModal">
    <a-modal
      :footer="null"
      title="增加专利"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      width="870px"
      :maskClosable="false">
      <a-spin :spinning="loading.spinning" size="large">
        <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol" class="my-model" ref="ruleForm">
          <a-form-model-item label="申请号" prop="applyNo">
            <a-row type="flex" align="middle">
              <a-col class="gutter-row" :span="20">
                <a-input v-model="form.applyNo"/>
              </a-col>
              <a-col class="gutter-row" :span="4">
                <a-button
                  type="primary"
                  class="my-search"
                  tabindex="-1"
                  @click="searchPatent">查询
                </a-button>
              </a-col>
            </a-row>
          </a-form-model-item>

          <a-form-model-item label="专利名称">
            <a-input :disabled="true" v-model="item.patentName"></a-input>
          </a-form-model-item>
          <a-form-model-item label="专利类型">
            <a-input :disabled="true" v-model="item.patentTypeName"></a-input>
          </a-form-model-item>
          <a-form-model-item label="申请日">
            <a-input :disabled="true" v-model="item.applyDate"></a-input>
          </a-form-model-item>
          <a-form-model-item label="公开日">
            <a-input :disabled="true" v-model="item.announcementDay"></a-input>
          </a-form-model-item>
          <a-form-model-item label="法律状态">
            <a-input :disabled="true" v-model="item.lawSatausName"></a-input>
          </a-form-model-item>
          <a-form-model-item label="权利人">
            <a-input :disabled="true" v-model="item.applyer"></a-input>
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
  import { initDictOptions, filterDictText } from '@/components/dict/JDictSelectUtil'

  export default {
    name: 'FinancialAddPatentModal',
    data() {
      return {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
        visible: false,
        confirmLoading: false,

        url: '/trusteeship/portalPatentTrusteeship/queryByApplyNo',
        loading: {
          spinning: false
        },
        form: {
          applyNo: '',
          functionBlock: '1'
        },

        item: {},
        dictOptions: [],
        dictOptions2: [],

        selectOptions: []
      }
    },
    methods: {
      searchPatent() {
        if (this.form.applyNo === '') {
          this.$message.warning('请先输入专利申请号')
          return false
        }
        if (this.selectOptions.indexOf(this.form.applyNo) > -1) {
          this.$message.warning('申请号已存在')
          return false
        }
        this.loadData()
      },
      async loadData() {
        this.loading.spinning = true
        const dicRes = await initDictOptions('patent_status')
        const dicRes2 = await initDictOptions('patent_type')
        if (dicRes.success) {
          this.dictOptions = dicRes.result
        }
        if (dicRes2.success) {
          this.dictOptions2 = dicRes2.result
        }
        const res = await getActionUpdateKeyword(this.url, this.form)
        if (res.success) {
          console.info(res)
          console.info('hahah')
          const result = res['result']['obj']
          if (result === null) {
            this.$message.warning('没有此专利！')
          } else {
            const obj = result
            const record = {}
            record['applyNo'] = this.form.applyNo
            record['patentName'] = obj['title']
            record['applyer'] = obj['applicant']
            record['applyDate'] = obj['applicationDate']
            record['announcementDay'] = obj['publicationDate']
            record['announcementCode'] = obj['publicationDocNum']
            record['patentType'] = obj['type']
            record['patentTypeName'] = filterDictText(this.dictOptions2, obj['type'])
            record['lawSataus'] = obj['validate']
            record['lawSatausName'] = filterDictText(this.dictOptions, obj['validate'])
            record['key'] = this.form.applyNo + '-' + obj['publicationDocNum']

            this.item = record
          }
        } else {
          this.$message.error(res.message)
        }
        this.loading.spinning = false
      },
      showModal(arr) {
        this.visible = true
        this.selectOptions = arr
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
  #financialAddPatentModal {

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