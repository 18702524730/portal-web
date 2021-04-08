<template>
  <div id="serviceProjectFrom">
    <div class="container">
      <a-form :form="filter">
        <a-form-item label="筛选分类:" :label-col="labelCol" :wrapper-col="wrapperCol">
          <div>
            <template v-for="(tag, index) in tags">
              <a-tag :key="tag.key" :closable="true" @close="handleClose(tag)">
                {{tag.text}}
              </a-tag>
            </template>
          </div>
        </a-form-item>

        <a-form-item label="服务分类:" :label-col="labelCol" :wrapper-col="wrapperCol">
          <tree-select-for-dict

            :dict="dictList.serviceTypeIds.dictCode"
            :treeCheckable="false"
            v-model="filter.serviceTypeIds"
            placeholder="请选择"
            ref="mySelectDict">
          </tree-select-for-dict>

        </a-form-item>

        <a-form-item label="服务价格:" :label-col="labelCol" :wrapper-col="newWrapperCol">
          <a-radio-group buttonStyle="solid" v-model="filter.pantentMoney">
            <template v-for="(item,index) in dictList.pantentMoney.dictOptions">
              <a-radio-button :value="item.value" :key="index">{{item.text}}</a-radio-button>
            </template>
          </a-radio-group>
          <a-input-search placeholder="输入关键字搜索..." style="width: 200px" v-model="filter.keyword"
                          @search="handleSearch"/>

        </a-form-item>

      </a-form>
    </div>
  </div>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'
  import moment from 'moment'
  import TreeSelectForDict from '../general/TreeSelectForDict'

  export default {
    name: 'ServiceProjectFrom',
    components: { TreeSelectForDict },
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
          sm: { span: 21 }
        },
        rangeConfig: {},
        tags: [],
        filter: {
          serviceTypeIds: '',
          pantentMoney: '',
          publishDateType: '',
          keyword: null,
          startDate: '',
          endDate: ''
        },
        dictList: {
          pantentMoney: {
            dictCode: 'pro_amout',
            dictOptions: []
          },
          publishDateType: {
            dictCode: 'publish_time_type',
            dictOptions: []
          },
          serviceTypeIds: {
            dictCode: 'serviceTypeTree',
            dictOptions: []
          }
        },
        selectDate: null,
        dictUrl: '/zscq/portal/getDictInfo'
      }
    },
    created() {
      if (this.$route.params.selectValues !== undefined && this.$route.params.selectValues !== '') {
        this.filter.serviceTypeIds = this.$route.params.selectValues
      }
      for (const item in this.dictList) {
        this.initDictData(this.dictList[item])
      }
      this.$nextTick(() => {
        this.loadItemByCode()
      })
    },
    mounted() {

    },
    methods: {
      loadItemByCode() {
        if (this.$route.query.keyId !== undefined) {
          this.$refs.mySelectDict.loadItemByCode(this.$route.query.keyId)
        }
      },
      initDictData(item) {
        // 根据字典Code, 初始化字典数组
        const param = { code: item.dictCode }
        getActionUpdateKeyword(this.dictUrl, param).then((res) => {
          if (res.success) {
            item.dictOptions = res.result
          }
        })
      },
      handleSearch(value) {
        this.$emit('func', this.filter)
      },
      handleClose(tag) {
        const arg = this.tags
        for (let i = 0; i < arg.length; i++) {
          if (arg[i].key === tag.key) {
            arg.splice(i, 1)
          }
        }
        switch (tag.key) {
          case 'pro_amout':
            this.filter.pantentMoney = ''
            break
          case 'publish_time_type':
            this.filter.startDate = ''
            this.filter.endDate = ''
            this.selectDate = null
            this.filter.publishDateType = ''
            break
        }
        this.$emit('func', this.filter)
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
        this.$emit('func', this.filter)
      }
    },
    beforeDestroy() {
    },
    watch: {
      'filter.serviceTypeIds': {
        handler(newData, oldData) {
          this.$emit('func', this.filter)
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
            this.$emit('func', this.filter)
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
            this.$emit('func', this.filter)
          }
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../components/main";
  #serviceProjectFrom {
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