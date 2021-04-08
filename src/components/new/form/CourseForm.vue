<template>
  <div id="courseForm">
    <div class="container">
      <a-form :form="filter">
        <a-form-item label="筛选:" :label-col="labelCol" :wrapper-col="wrapperCol">
          <div>
            <template v-for="(tag, index) in tags">
              <a-tag :key="tag.key" @close="handleClose(tag)" :closable="true">
                {{tag.text}}
              </a-tag>
            </template>
          </div>
        </a-form-item>
        <a-form-item label="类别:" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-radio-group buttonStyle="solid" v-model="filter.type">
            <template v-for="(item,index) in dictList.type.dictOptions">
              <a-radio-button :value="item.value" :key="index">{{item.text}}</a-radio-button>
            </template>
          </a-radio-group>

        </a-form-item>
        <a-form-item label="分类:" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-radio-group buttonStyle="solid" v-model="filter.classification">
            <template v-for="(item,index) in dictList.classification.dictOptions">
              <a-radio-button :value="item.value" :key="index">{{item.text}}</a-radio-button>
            </template>
          </a-radio-group>

        </a-form-item>

        <a-form-item label="名称:" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-input-search placeholder="输入关键字搜索..." style="width: 200px" v-model="filter.kwText"
                          @search="handleSearch"/>
        </a-form-item>

      </a-form>


    </div>
  </div>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'
  import bus from '@/assets/eventBus'

  export default {
    name: 'CourseForm',
    components: {},
    props: {},
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
          type: '',
          classification: '',
          kwText: ''
        },
        dictList: {
          type: {
            dictCode: 'course_type',
            dictOptions: []
          },
          classification: {
            dictCode: 'course_classification',
            dictOptions: []
          }
        },
        dictUrl: '/zscq/portal/getDictInfo',
        selectDate: null
      }
    },
    created() {
      for (const item in this.dictList) {
        this.initDictData(this.dictList[item])
      }
    },
    methods: {
      handleSearch(value) {
        this.changeParam(this.filter)
      },
      changeParam(param) {
        bus.$emit('changeParamCourse', param)
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
          case 'course_type':
            this.filter.type = ''
            break
          case 'course_classification':
            this.filter.classification = ''
            break
        }
        this.changeParam(this.filter)
      }
    },
    watch: {
      'filter.type': {
        handler(newData, oldData) {
          const a = this.dictList.type.dictOptions.filter(item => item.value === newData)[0]
          if (a !== undefined) {
            const arg = this.tags
            if (oldData !== undefined && oldData !== '') {
              for (let i = 0; i < arg.length; i++) {
                if (arg[i].key === 'course_type') {
                  arg.splice(i, 1)
                }
              }
            }
            a.key = 'course_type'
            arg.push(a)
            this.changeParam(this.filter)
          }
        }
      },
      'filter.classification': {
        handler(newData, oldData) {

          const a = this.dictList.classification.dictOptions.filter(item => item.value === newData)[0]
          if (a !== undefined) {
            const arg = this.tags
            if (oldData !== undefined && oldData !== '') {
              for (let i = 0; i < arg.length; i++) {
                if (arg[i].key === 'course_classification') {
                  arg.splice(i, 1)
                }
              }
            }
            a.key = 'course_classification'
            arg.push(a)
            this.changeParam(this.filter)
          }
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../main";

  #courseForm {
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