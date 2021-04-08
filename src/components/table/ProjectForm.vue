<template>
  <div id="projectForm">
    <div class="container">
      <a-form :form="filter">
        <a-form-item label="筛选分类:" :label-col="labelCol" :wrapper-col="wrapperCol">
          <div>
            <template v-for="(tag, index) in tags">
              <a-tag :key="tag.key" :closable="tag.key !== 'requirement_type'" @close="handleClose(tag)">
                {{tag.text}}
              </a-tag>
            </template>
          </div>
        </a-form-item>
        <a-form-item label="交易类别:" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-radio-group buttonStyle="solid" v-model="filter.supplyRequirementType" @change="onChangeType">
            <template v-for="(item,index) in dictList.supplyRequirementType.dictOptions">
              <a-radio-button :value="item.value" :key="index">{{item.text}}</a-radio-button>
            </template>
          </a-radio-group>

        </a-form-item>
        <a-form-item label="所属行业:" :label-col="labelCol" :wrapper-col="wrapperCol">
          <tree-select-for-dict
            :dict="dictList.belongIndustry.dictCode"
            v-model="filter.belongIndustry"
            placeholder="请选择所属行业"
            :multiple="false"
            :treeCheckable="false"
            ref="myDict">
          </tree-select-for-dict>

        </a-form-item>
        <a-form-item label="项目地点:" :label-col="labelCol" :wrapper-col="wrapperCol">
          <tree-select-for-dict
            :dict="dictList.location.dictCode"
            v-model="filter.madeAreaCode"
            placeholder="请选择项目地点">
          </tree-select-for-dict>

        </a-form-item>
        <!--<a-form-item label="项目类型:" :label-col="labelCol" :wrapper-col="wrapperCol" v-if="demandOrSupply === 'supply'">-->
          <!--<a-radio-group buttonStyle="solid" v-model="filter.projectType">-->
            <!--<template v-for="(item,index) in dictList.projectType.dictOptions">-->
              <!--<a-radio-button :value="item.value" :key="index">{{item.text}}</a-radio-button>-->
            <!--</template>-->
          <!--</a-radio-group>-->

        <!--</a-form-item>-->
        <!--<a-form-item label="项目成熟度:" :label-col="labelCol" :wrapper-col="wrapperCol">-->
          <!--<a-radio-group buttonStyle="solid" v-model="filter.projectMaturity">-->
            <!--<template v-for="(item,index) in dictList.projectMaturity.dictOptions">-->
              <!--<a-radio-button :value="item.value" :key="index">{{item.text}}</a-radio-button>-->
            <!--</template>-->
          <!--</a-radio-group>-->

        <!--</a-form-item>-->

        <a-form-item label="意向运营方式:" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-radio-group buttonStyle="solid" v-model="filter.intendedOperationMode">
            <template v-for="(item,index) in dictList.intendedOperationMode.dictOptions">
              <a-radio-button :value="item.value" :key="index">{{item.text}}</a-radio-button>
            </template>
          </a-radio-group>

        </a-form-item>

        <a-form-item label="交易价格:" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-radio-group buttonStyle="solid" v-model="filter.pantentMoney">
            <template v-for="(item,index) in dictList.pantentMoney.dictOptions">
              <a-radio-button :value="item.value" :key="index">{{item.text}}</a-radio-button>
            </template>
          </a-radio-group>

        </a-form-item>
        <a-form-item label="发布时间:" :label-col="labelCol" :wrapper-col="newWrapperCol">
          <a-radio-group buttonStyle="solid" v-model="filter.publishDateType">
            <template v-for="(item,index) in dictList.publishDateType.dictOptions">
              <a-radio-button :value="item.value" :key="index">{{item.text}}</a-radio-button>
            </template>
          </a-radio-group>
          <div style="padding-left:7px;display: inline-block">
            <span>自定义:
              <a-range-picker @change="changeDate" v-model="selectDate"/>
            </span>
          </div>
          <a-input-search placeholder="输入关键字搜索..." style="width: 200px" v-model="filter.keyword"
                          @search="handleSearch"/>
        </a-form-item>

      </a-form>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import { getActionUpdateKeyword } from '@/api/manage'
  import bus from '@/assets/eventBus'
  import TreeSelectForDict from '../general/TreeSelectForDict'

  export default {
    name: 'ProjectForm',
    components: { TreeSelectForDict },
    props: {
      demandOrSupply: {
        type: String,
        default: 'demand'
      }
    },
    data() {
      return {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 3 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 18 }
        },
        newWrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 }
        },
        rangeConfig: {},
        tags: [],
        filter: {
          supplyRequirementType: '4',
          belongIndustry: '',
          madeAreaCode: '',
          projectMaturity: '',
          projectType: '',
          intendedOperationMode: '',
          pantentMoney: '',
          publishDateType: '',
          keyword: null,
          startDate: '',
          endDate: ''
        },
        dictList: {
          supplyRequirementType: {
            dictCode: 'requirement_type',
            dictOptions: []
          },
          belongIndustry: {
            dictCode: 'belong_industry',
            dictOptions: []
          },
          location: {
            dictCode: 'location',
            dictOptions: []
          },
          projectMaturity: {
            dictCode: 'pro_maturity',
            dictOptions: []
          },
          projectType: {
            dictCode: 'pro_type',
            dictOptions: []
          },
          intendedOperationMode: {
            dictCode: 'intended_operation_mode',
            dictOptions: []
          },
          pantentMoney: {
            dictCode: 'pro_amout',
            dictOptions: []
          },
          publishDateType: {
            dictCode: 'publish_time_type',
            dictOptions: []
          }
        },
        dictUrl: '/zscq/portal/getDictInfo',
        selectDate: null
      }
    },
    created() {
      if (this.demandOrSupply === 'supply') {
        this.dictList.supplyRequirementType.dictCode = 'supply_type'
        this.filter.supplyRequirementType = '1'
      }
      for (const item in this.dictList) {
        this.initDictData(this.dictList[item])
      }
    },
    methods: {
      onChangeType(e) {
        if (this.demandOrSupply === 'demand') {
          if (`${e.target.value}` === '5') {
            this.$router.push({ name: 'DemandCenter' })
          }
          if (`${e.target.value}` === '6') {
            this.$router.push({ name: 'BrandCenter' })
          }
        } else if (this.demandOrSupply === 'supply') {
          if (`${e.target.value}` === '3') {
            this.$router.push({ name: 'SupplyBrandMessage' })
          }
          if (`${e.target.value}` === '2') {
            this.$router.push({ name: 'SupplyPatentMessage' })
          }
        }
      },
      handleSearch(value) {
        this.changeParam(this.filter)
      },
      changeDate(date, dateString) {
        const arg = this.tags
        for (let i = 0; i < arg.length; i++) {
          if (arg[i].key === 'publish_time_type') {
            arg.splice(i, 1)
          }
        }
        this.filter.publishDateType = ''
        if (date.length > 0) {
          this.filter.startDate = moment(date[0]).format('YYYY-MM-DD')
          this.filter.endDate = moment(date[1]).format('YYYY-MM-DD')
          const a = {
            key: 'publish_time_type',
            text: dateString[0] + '~' + dateString[1]
          }
          arg.push(a)
        } else {
          this.filter.startDate = ''
          this.filter.endDate = ''
        }
        this.changeParam(this.filter)
      },
      changeParam(param) {
        if (this.demandOrSupply === 'demand') {
          bus.$emit('changeParamDemandProject', param)
        } else if (this.demandOrSupply === 'supply') {
          bus.$emit('changeParamSupplyProject', param)
        }
      },
      onChange(value, selectedOptions) {
        console.log(value, selectedOptions)
      },
      initDictData(item) {
        // 根据字典Code, 初始化字典数组
        const param = { code: item.dictCode }
        getActionUpdateKeyword(this.dictUrl, param).then((res) => {
          if (res.success) {
            console.info(res)
            item.dictOptions = res.result
            if (item.dictCode === 'requirement_type' || item.dictCode === 'supply_type') {
              const a = item.dictOptions.filter(item => item.value === this.filter.supplyRequirementType)[0]
              a.key = 'requirement_type'
              this.tags.push(a)
            }
            // if (this.demandOrSupply === 'supply') {
            //   if (item.dictCode === 'pro_type') {
            //     const a = item.dictOptions.filter(item => item.value === this.filter.projectType)[0]
            //     a.key = 'pro_type'
            //     this.tags.push(a)
            //   }
            // }
          }
        })
      },
      handleClose(tag) {
        const arg = this.tags
        for (let i = 0; i < arg.length; i++) {
          if (arg[i].key === tag.key) {
            arg.splice(i, 1)
          }
        }
        switch (tag.key) {
          case 'belong_industry':
            this.$refs.myDict.treeValue = null
            this.filter.belongIndustry = ''
            break
          case 'location':
            this.filter.madeAreaCode = ''
            break
          case 'pro_maturity':
            this.filter.projectMaturity = ''
            break
          case 'intended_operation_mode':
            this.filter.intendedOperationMode = ''
            break
          case 'pro_amout':
            this.filter.pantentMoney = ''
            break
          case 'publish_time_type':
            this.filter.startDate = ''
            this.filter.endDate = ''
            this.selectDate = null
            this.filter.publishDateType = ''
            break
          case 'pro_type':
            this.filter.projectType = ''
            break
        }
        this.changeParam(this.filter)
      }
    },
    watch: {
      'filter.belongIndustry': {
        handler(newData, oldData) {
          const treeValue = this.$refs.myDict.treeValue
          const arg = this.tags
          for (let i = 0; i < arg.length; i++) {
            if (arg[i].key === 'belong_industry') {
              arg.splice(i, 1)
            }
          }
          if (treeValue && JSON.stringify(treeValue) !== '{}') {
            treeValue.key = 'belong_industry'
            treeValue.text = treeValue.label
            arg.push(treeValue)
          }
          this.changeParam(this.filter)
        }
      },
      'filter.madeAreaCode': {
        handler(newData, oldData) {
          this.changeParam(this.filter)
        }
      },
      'filter.projectMaturity': {
        handler(newData, oldData) {
          const a = this.dictList.projectMaturity.dictOptions.filter(item => item.value === newData)[0]
          if (a !== undefined) {
            const arg = this.tags
            if (oldData !== undefined && oldData !== '') {
              for (let i = 0; i < arg.length; i++) {
                if (arg[i].key === 'pro_maturity') {
                  arg.splice(i, 1)
                }
              }
            }
            a.key = 'pro_maturity'
            arg.push(a)
            this.changeParam(this.filter)
          }
        }
      },
      'filter.projectType': {
        handler(newData, oldData) {

          const a = this.dictList.projectType.dictOptions.filter(item => item.value === newData)[0]
          if (a !== undefined) {
            const arg = this.tags
            if (oldData !== undefined && oldData !== '') {
              for (let i = 0; i < arg.length; i++) {
                if (arg[i].key === 'pro_type') {
                  arg.splice(i, 1)
                }
              }
            }
            a.key = 'pro_type'
            arg.push(a)
            this.changeParam(this.filter)
          }
        }
      },
      'filter.intendedOperationMode': {
        handler(newData, oldData) {
          const a = this.dictList.intendedOperationMode.dictOptions.filter(item => item.value === newData)[0]
          if (a !== undefined) {
            const arg = this.tags
            if (oldData !== undefined && oldData !== '') {
              for (let i = 0; i < arg.length; i++) {
                if (arg[i].key === 'intended_operation_mode') {
                  arg.splice(i, 1)
                }
              }
            }
            a.key = 'intended_operation_mode'
            arg.push(a)
            this.changeParam(this.filter)
          }
        }
      },
      'filter.pantentMoney': {
        handler(newData, oldData) {
          const a = this.dictList.pantentMoney.dictOptions.filter(item => item.value === newData)[0]
          if (a !== undefined) {
            const arg = this.tags
            if (oldData !== undefined && oldData !== '') {
              for (let i = 0; i < arg.length; i++) {
                if (arg[i].key === 'pro_amout') {
                  arg.splice(i, 1)
                }
              }
            }
            a.key = 'pro_amout'
            arg.push(a)
            this.changeParam(this.filter)
          }
        }
      },
      'filter.publishDateType': {
        handler(newData, oldData) {
          const a = this.dictList.publishDateType.dictOptions.filter(item => item.value === newData)[0]
          if (a !== undefined) {
            const arg = this.tags
            for (let i = 0; i < arg.length; i++) {
              if (arg[i].key === 'publish_time_type') {
                arg.splice(i, 1)
                this.filter.startDate = ''
                this.filter.endDate = ''
                this.selectDate = null
              }
            }
            a.key = 'publish_time_type'
            arg.push(a)
            this.changeParam(this.filter)
          }
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../main";

  #projectForm {
    .main-css();
    color: #333333;
    background-color: @main-bg-color;
    font-size: 14px;
    padding-bottom: 5px;
    .container {
      padding-top: 20px;
      padding-bottom: 5px;
      background-color: #fff;
    }
    overflow: hidden;
    /deep/ .ant-form-item-label label {
      font-weight: 400;
      font-style: normal;
      font-size: 13px;
      color: #999999;
      text-align: left;
      padding-right: 10px;
    }
    .ant-input-search {
      margin-left: 30px;
      /deep/ .ant-input {
        border-top-left-radius: 30px;
        border-bottom-left-radius: 30px;
        border-top-right-radius: 30px;
        border-bottom-right-radius: 30px;
      }
    }
    .ant-tag {
      font-size: 14px;
      /deep/ svg {
        color: #ff3300;
      }
    }
    .ant-form-item {
      margin-bottom: 12px;
    }

  }


</style>