<template>
  <div id="financialApplyThird">
    <a-row>
      <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol" class="my-model" ref="ruleForm">
        <a-form-model-item label="选择方式">
          <a-radio-group :value="way" @change="changeRadio">
            <a-radio value="1">
              自行选择
            </a-radio>
            <a-radio value="2">
              系统匹配
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="贷款银行">
          <j-dict-select-tag type="list" :value="orgId"
                             dictCode="portal_org_finance,name,id,type=3"
                             placeholder="请选择银行" v-if="way === '1'" @input="inputValue" :need-name="true"/>
          <a-row v-else-if="way === '2'"><span>待系统匹配</span></a-row>
          <a-row>
            <span style="color: #f59a23">提示：融资产品届时由银行评估后确定。</span>
            <!--<a-checkbox @change="onChange" :checked="checkBtn">-->
              <!--接受质押给第三方担保机构或者保险机构-->
            <!--</a-checkbox>-->
          </a-row>
        </a-form-model-item>
      </a-form-model>
    </a-row>
    <a-row class="my-bottom-btn">
      <a-button @click="backPage">上一步</a-button>
      <a-button type="primary" @click="nextPage">下一步</a-button>
    </a-row>
  </div>
</template>

<script>
  import JDictSelectTag from '../../components/general/JDictSelectTag'

  export default {
    name: 'FinancialApplyThird',
    components: { JDictSelectTag },
    props: {
      orgId: {
        type: String,
        default: ''
      },
      way: {
        type: String,
        default: '1'
      },
      receivePledge: {
        type: String,
        default: '0'
      },
      orgName: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        labelCol: { span: 4, offset: 4 },
        wrapperCol: { span: 9, offset: 1 },
        form: {},
        checkBtn: false
      }
    },
    watch: {
      receivePledge: {
        handler(data) {
          if (data === '1') {
            this.checkBtn = true
          } else {
            this.checkBtn = false
          }
        },
        immediate: true

      }
    },
    methods: {
      changeRadio(e) {
        this.$emit('update:way', e.target.value)
        this.$emit('update:orgId', '')
        this.$emit('update:orgName', '')
      },
      inputValue(orgId, orgName) {
        this.$emit('update:orgId', orgId)
        this.$emit('update:orgName', orgName)
      },
      nextPage() {
        if (this.way === '1' && this.orgId === '') {
          this.$message.warning('自行选择需要选择相关银行')
          return false
        }
        this.$emit('nextPage')
      },
      backPage() {
        this.$emit('backPage')
      },
      onChange() {
        if (this.checkBtn) {
          this.$emit('update:receivePledge', '0')
        } else {
          this.$emit('update:receivePledge', '1')
        }
      }
    }
  }
</script>

<style scoped lang="less">
  #financialApplyThird {
    .my-bottom-btn {
      margin-top: 50px;
      text-align: center;
      .ant-btn {
        width: 150px;
        margin: 10px;
      }
    }
    /deep/ span.ant-radio + * {
      padding-right: 60px;
    }
  }
</style>