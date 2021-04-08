<template>
  <div id="geographicForm">
    <div class="container">
      <a-form :form="filter">
        <a-form-item label="筛选:" :label-col="labelCol" :wrapper-col="wrapperCol">
          <div>
            <template v-for="(tag, index) in tags">
              <a-tag :key="tag.key" :closable="tag.key !== 'product_nature'" @close="handleClose(tag)">
                {{tag.text}}
              </a-tag>
            </template>
          </div>
        </a-form-item>
        <a-form-item label="类别:" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-radio-group buttonStyle="solid" v-model="filter.productNature">
            <template v-for="(item,index) in dictList.productNature.dictOptions">
              <a-radio-button :value="item.value" :key="index">{{item.text}}</a-radio-button>
            </template>
          </a-radio-group>

        </a-form-item>
        <a-form-item label="国家:" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-radio-group buttonStyle="solid" v-model="filter.countryType">
            <template v-for="(item,index) in dictList.countryType.dictOptions">
              <a-radio-button :value="item.value" :key="index">{{item.text}}</a-radio-button>
            </template>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="类目:" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-radio-group buttonStyle="solid" v-model="filter.type">
            <template v-for="(item,index) in dictList.type.dictOptions">
              <a-radio-button :value="item.value" :key="index">{{item.text}}</a-radio-button>
            </template>
          </a-radio-group>

        </a-form-item>
        <a-form-item label="地域:" :label-col="labelCol" :wrapper-col="wrapperCol" v-show="filter.countryType === '1'">
          <tree-select-for-dict
            :load="false"
            :datas="areaOptions"
            :treeCheckable="false"
            v-model="filter.area"
            placeholder="请选择地域"
            ref="mySelectDict">
          </tree-select-for-dict>
        </a-form-item>

        <a-form-item label="名称:" :label-col="labelCol" :wrapper-col="newWrapperCol">
          <a-input-search placeholder="输入关键字搜索..." style="width: 200px" v-model="filter.keyword"
                          @search="handleSearch"/>
        </a-form-item>

      </a-form>
    </div>
  </div>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'
  import bus from '@/assets/eventBus'
  import TreeSelectForDict from '../../general/TreeSelectForDict'

  export default {
    name: 'GeographicForm',
    components: { TreeSelectForDict },
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
          productNature: '1',
          countryType: '',
          type: '',
          keyword: null,
          area: ''
        },
        dictList: {
          productNature: {
            dictCode: 'product_nature',
            dictOptions: []
          },
          countryType: {
            dictCode: 'country_type',
            dictOptions: []
          },
          type: {
            dictCode: 'geo_indication_type',
            dictOptions: []
          }
        },
        dictUrl: '/zscq/portal/getDictInfo',
        selectDate: null,
        areaOptions: []
      }
    },
    created() {
      for (const item in this.dictList) {
        this.initDictData(this.dictList[item])
      }
      this.loadArea()
    },
    methods: {
      loadArea() {
        getActionUpdateKeyword('/zscq/portal/getThreeAreaDatas').then((res) => {
          this.areaOptions = res
        })
      },
      handleSearch(value) {
        this.changeParam(this.filter)
      },
      changeParam(param) {
        bus.$emit('changeParamGengraphic', param)
      },
      initDictData(item) {
        // 根据字典Code, 初始化字典数组
        const param = { code: item.dictCode }
        getActionUpdateKeyword(this.dictUrl, param).then((res) => {
          if (res.success) {
            console.info(res)
            item.dictOptions = res.result
            if (item.dictCode === 'product_nature') {
              const a = item.dictOptions.filter(item => item.value === this.filter.productNature)[0]
              a.key = 'product_nature'
              this.tags.push(a)
            }
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
          case 'product_nature':
            this.filter.productNature = ''
            break
          case 'country_type':
            this.filter.countryType = ''
            this.$refs.mySelectDict.treeValue = null
            this.filter.area = ''
            break
          case 'type':
            this.filter.type = ''
            break
        }
        this.changeParam(this.filter)
      }
    },
    watch: {
      'filter.productNature': {
        handler(newData, oldData) {
          const a = this.dictList.productNature.dictOptions.filter(item => item.value === newData)[0]
          if (a !== undefined) {
            const arg = this.tags
            if (oldData !== undefined && oldData !== '') {
              for (let i = 0; i < arg.length; i++) {
                if (arg[i].key === 'product_nature') {
                  arg.splice(i, 1)
                }
              }
            }
            a.key = 'product_nature'
            arg.push(a)
            this.changeParam(this.filter)
          }
        }
      },
      'filter.countryType': {
        handler(newData, oldData) {
          this.$refs.mySelectDict.treeValue = null
          this.filter.area = ''
          const a = this.dictList.countryType.dictOptions.filter(item => item.value === newData)[0]
          if (a !== undefined) {
            const arg = this.tags
            if (oldData !== undefined && oldData !== '') {
              for (let i = 0; i < arg.length; i++) {
                if (arg[i].key === 'country_type') {
                  arg.splice(i, 1)
                }
              }
            }
            a.key = 'country_type'
            arg.push(a)
            this.changeParam(this.filter)
          }
        }
      },
      'filter.area': {
        handler(newData, oldData) {
          this.changeParam(this.filter)
        }
      },
      'filter.type': {
        handler(newData, oldData) {
          const a = this.dictList.type.dictOptions.filter(item => item.value === newData)[0]
          if (a !== undefined) {
            const arg = this.tags
            if (oldData !== undefined && oldData !== '') {
              for (let i = 0; i < arg.length; i++) {
                if (arg[i].key === 'type') {
                  arg.splice(i, 1)
                }
              }
            }
            a.key = 'type'
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
  @import "./form";

  #geographicForm {
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
  }


</style>