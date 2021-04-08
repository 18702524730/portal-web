<template>
  <div id="professorForm">
    <div class="container">
      <a-form :form="filter">
        <!--<a-form-item label="筛选:" :label-col="labelCol" :wrapper-col="wrapperCol">-->
        <!--<div>-->
        <!--<template v-for="(tag, index) in tags">-->
        <!--<a-tag :key="tag.key" :closable="tag.key !== 'requirement_type'" @close="handleClose(tag)">-->
        <!--{{tag.text}}-->
        <!--</a-tag>-->
        <!--</template>-->
        <!--</div>-->
        <!--</a-form-item>-->
        <a-form-item label="类型:" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-row class="my-btn-group">
            <a-button :type="`${value === 'zscqType'?'primary':''}`" @click="btnClick('zscqType')">
              知识产权专家
            </a-button>
            <a-button :type="`${value === 'zyjsType'?'primary':''}`" @click="btnClick('zyjsType')">
              专业技术专家
            </a-button>
          </a-row>
          <a-radio-group buttonStyle="solid" v-model="filter.type" v-if="value !== '' && dictList[`${value}`]">
            <template v-for="(item,index) in dictList[`${value}`].dictOptions">
              <a-radio-button :value="item.value" :key="index">{{item.text}}</a-radio-button>
            </template>
          </a-radio-group>
        </a-form-item>

        <a-form-item label="名称:" :label-col="labelCol" :wrapper-col="newWrapperCol">
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
    name: 'ProfessorForm',
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
          kwText: ''
        },
        dictList: {
          zscqType: {
            dictCode: 'zscq_expert',
            dictOptions: []
          },
          zyjsType: {
            dictCode: 'zyjs_expert',
            dictOptions: []
          }
        },
        dictUrl: '/zscq/portal/getDictInfo',
        selectDate: null,
        value: ''
      }
    },
    created() {
      for (const item in this.dictList) {
        this.initDictData(this.dictList[item])
      }
    },
    methods: {
      btnClick(value) {
        this.filter.type = ''
        this.changeParam(this.filter)
        if (this.value === value) {
          this.value = ''
        } else {
          this.value = value
        }
      },
      handleSearch(value) {
        this.changeParam(this.filter)
      },
      changeParam(param) {
        bus.$emit('changeParamProfessor', param)
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
          case 'expert':
            this.filter.type = ''
            break
        }
        this.changeParam(this.filter)
      }
    },
    watch: {
      'filter.type': {
        handler(newData, oldData) {
          if (this.value === '') {
            return
          }
          const a = this.dictList[`${this.value}`].dictOptions.filter(item => item.value === newData)[0]
          if (a !== undefined) {
            const arg = this.tags
            if (oldData !== undefined && oldData !== '') {
              for (let i = 0; i < arg.length; i++) {
                if (arg[i].key === 'expert') {
                  arg.splice(i, 1)
                }
              }
            }
            a.key = 'expert'
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

  #professorForm {
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

    .my-btn-group {
      height: 50px;
      .ant-btn {
        margin-right: 20px;
        border-radius: 30px;
        padding: 0 30px;
      }
      .ant-btn-primary {
      }
    }
  }


</style>