<template>
  <div id="projectFlowCard">
    <a-card hoverable :bordered="false" :class="[item.tagState?'select-border':'not-select-border']"
            @click="handleClick(item)">
      <a-row class="card-head">
        <a-radio-group :value="item.tagState" style="position: absolute;padding-left: 5px;padding-top: 5px">
          <a-radio :value="true">
          </a-radio>
        </a-radio-group>
        <img :src="item.imgUrl" alt="相关图片">
      </a-row>
      <div class="card-content" v-if="content">
        <div class="min-div">
          <p class="p-span">
            <span>持有方类型：</span>
            <span>{{item.ownProject}}</span>
          </p>
          <p class="p-span">
            <span>适用范围：</span>
            <span>{{item.require}}</span>
          </p>
        </div>
      </div>
    </a-card>

  </div>
</template>

<script>

  export default {
    name: 'ProjectFlowCard',
    components: {},
    props: {
      item: {
        type: Object,
        default: () => {
          return {
            projectType: '高端项目登记',
            ownProject: '个人、企业、科研院所、高校、社会团体、其他',
            require: '高端项目的项目形式不限，该项目为国家平台自营项目，通过国家平台的对外合作，进行线下对接，筛选出具有一定经济价值的项目入库',
            steps: [
              { title: '高端项目接洽', content: '项目持有方发出申请，后台工作人员会与其取得联系并进行项目的接洽，接洽成功后持有方可登记高端项目' },
              { title: '持有方信息确认', content: '确认当前登录账号的身份信息，补充项目联系人信息填写' },
              { title: '基本信息填写', content: '填写项目名称、项目所属行业、项目有效期、项目专利、运营方式等' },
              { title: '描述信息填写', content: '填写项目的适用范围、项目简介、项目图片、项目优势等' },
              { title: '预览提交', content: '预览所填的项目信息，提交等待审核' }
            ],
            imgUrl: 'https://img.yzcdn.cn/vant/cat.jpeg',
            projectKey: 'HighProjectRegister',
            type: '1',
            tagState: false
          }
        }
      },
      content: {
        type: Boolean,
        default: true
      }
    },
    data() {
      const validatorRequired = (rule, value, callback) => {
        if (!value) {
          callback(new Error(rule['message']))
        }
        callback()
      }
      return {
        promiseVisible: false,
        ruleVisible: false,
        form: {
          agreeBox: false
        },
        wrapperCol: { span: 24 },
        rules: {
          agreeBox: [
            { message: '请先同意承诺书及管理规则！', validator: validatorRequired }
          ]
        }
      }
    },
    methods: {
      onChange() {
      },
      handleClick(item) {
        this.$emit('func', item)
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../main";

  #projectFlowCard {
    margin-bottom: 20px;
    .select-border {
      border: 2px solid @main-color;
      transform: scale(1.1);
      box-shadow: 0 4px 20px rgba(0,0,0,.3);
    }
    .not-select-border {
      border: 2px solid @main-bg-color;
    }
    .ant-card-hoverable:hover{
      transform: scale(1.1);
      box-shadow: 0 4px 20px rgba(0,0,0,.3);
    }
    /deep/ .ant-card-body {
      padding: 0;
      transition: all 0.6s;
    }
    .card-head {
      height: 190px;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .card-content {
      padding: 10px;
      .p-span {
        margin-bottom: 0;
        font-size: 14px;
        line-height: 24px;
        color: #333333;
        span:nth-child(1) {
          font-family: '微软雅黑 Bold', '微软雅黑 Regular', '微软雅黑', sans-serif;
          font-weight: 700;
        }
        span:nth-child(2) {
          font-family: '微软雅黑', sans-serif;
          font-weight: 400;
        }
      }
      .min-div {
        min-height: 130px;
      }
      .inner-flow {
        padding-top: 10px;
        .h3-head {
          background-color: @main-bg-color;
          h3 {
            margin-bottom: 0;
            font-weight: 700;
            font-style: normal;
            color: #0099FF;
            line-height: 28px;
            font-family: '微软雅黑 Bold', '微软雅黑 Regular', '微软雅黑', sans-serif;
            font-size: 14px;
          }
          border-bottom: 1px solid #e8e8e8;
        }
        .flow-steps {
          padding: 10px;
          /deep/ .ant-steps-item-description {
            font-size: 12px;
          }
        }
      }
      .submit-box {
        .my-checkbox {
          a {
            font-size: 12px;
          }
          span {
            font-size: 13px;
          }
        }
        .my-bottom-btn {
          text-align: center;
          margin-bottom: 10px;
          .my-btn {
            font-size: 14px;
            padding: 0 24px;
          }
        }
      }
    }
  }
</style>