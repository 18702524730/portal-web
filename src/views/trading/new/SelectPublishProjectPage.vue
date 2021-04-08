<template>
  <div id="selectPublishProjectPage">
    <div class="container">
      <h2>供应信息发布</h2>
      <a-row type="flex" justify="center">
        <a-col :span="8">
          <a-divider><span class="line-title">选择供应类型</span></a-divider>
        </a-col>
      </a-row>
      <a-row :gutter="45">
        <a-col :span="8" v-for="(item,index) in cardList" :key="index">
          <project-flow-card :item="item" @func="changeSelect"></project-flow-card>
        </a-col>
      </a-row>

      <a-row type="flex" justify="center" class="my-form">
        <a-form-model :model="form" :wrapper-col="wrapperCol" :rules="rules" ref="ruleForm">
          <a-form-model-item prop="agreeBox">
            <a-checkbox class="my-checkbox" v-model="form.agreeBox">
              <span>同意</span>
              <router-link target="_blank" :to="{name:'HelpCenter',query:{openKeys:'2',itemKeys:'1'}}">
                <span class="back-title">《厦门知识产权运营公共服务平台服务协议》</span>
              </router-link>
            </a-checkbox>
          </a-form-model-item>
        </a-form-model>
      </a-row>

      <a-row type="flex" justify="center" class="my-btn-group">
        <a-col :span="4">
          <a-button class="my-btn" type="primary" size="large" @click="toTop">上一步</a-button>
        </a-col>
        <a-col :span="4">
          <a-button class="my-btn" type="primary" size="large" @click="onSubmit">下一步</a-button>
        </a-col>
      </a-row>

      <a-modal :visible="promiseVisible" title="持有方承诺书" @cancel="handleCancel('promise')" :footer="null">
        <p>持有方承诺书</p>
      </a-modal>
      <a-modal :visible="ruleVisible" title="供需信息登记和管理规则" @cancel="handleCancel('rule')" :footer="null">
        <p>供需信息登记和管理规则</p>
      </a-modal>
    </div>

  </div>
</template>

<script>
  import ProjectFlowCard from '@/components/new/card/ProjectFlowCard'
  import { judgeState } from '@/utils/util'

  const cardList = [
    {
      id: '1',
      projectType: '自助项目登记',
      ownProject: '个人、企业、科研院所、高校、社会团体、其他',
      require: '知识产权持有人自助提交相关材料。',
      steps: [
        { title: '持有方信息确认', content: '确认当前登录账号的身份信息，补充项目联系人信息填写' },
        { title: '基本信息填写', content: '填写项目名称、项目所属行业、项目有效期、项目专利、运营方式等' },
        { title: '描述信息填写', content: '填写项目的适用范围、项目简介、项目图片、项目优势等' },
        { title: '预览提交', content: '预览所填的项目信息，提交等待审核' }
      ],
      imgUrl: require('@/assets/images/pp4.png'),
      projectKey: 'SelfHelpProjectRegister',
      type: '3',
      tagState: false
    },
    {
      id: '2',
      projectType: '托管项目登记',
      ownProject: '个人、企业、科研院所、高校、社会团体、其他',
      require: '知识产权服务机构提交相关材料，需提供委托证明。',
      steps: [
        { title: '持有方信息确认', content: '确认当前登录账号的身份信息，补充项目联系人信息填写' },
        { title: '基本信息填写', content: '填写项目名称、项目所属行业、项目有效期、项目专利、运营方式等' },
        { title: '描述信息填写', content: '填写项目的适用范围、项目简介、项目图片、项目优势等' },
        { title: '选择托管机构', content: '选择适合托管该项目的托管服务' },
        { title: '预览提交', content: '预览所填的项目信息，提交等待审核' }
      ],
      imgUrl: require('@/assets/images/pp3.png'),
      projectKey: 'EscrowProjectRegister',
      type: '2',
      tagState: false
    },
    {
      id: '3',
      projectType: '高端项目登记',
      ownProject: '个人、企业、科研院所、高校、社会团体、其他',
      require: '知识产权持有人向平台提出申请，委托平台运营所持有的知识产权。',
      steps: [
        { title: '高端项目接洽', content: '项目持有方发出申请，后台工作人员会与其取得联系并进行项目的接洽，接洽成功后持有方可登记高端项目' },
        { title: '持有方信息确认', content: '确认当前登录账号的身份信息，补充项目联系人信息填写' },
        { title: '基本信息填写', content: '填写项目名称、项目所属行业、项目有效期、项目专利、运营方式等' },
        { title: '描述信息填写', content: '填写项目的适用范围、项目简介、项目图片、项目优势等' },
        { title: '预览提交', content: '预览所填的项目信息，提交等待审核' }
      ],
      imgUrl: require('@/assets/images/pp6.png'),
      projectKey: 'HighProjectRegister',
      type: '1',
      tagState: false
    }
  ]
  export default {
    name: 'SelectPublishProjectPage',
    components: { ProjectFlowCard },
    data() {
      const validatorRequired = (rule, value, callback) => {
        if (!value) {
          callback(new Error(rule['message']))
        }
        callback()
      }
      return {
        cardList: cardList,
        selectItem: {},
        wrapperCol: { span: 24 },
        form: {
          agreeBox: false
        },
        rules: {
          agreeBox: [
            { message: '请先同意承诺书及管理规则！', validator: validatorRequired }
          ]
        },

        promiseVisible: false,
        ruleVisible: false
      }
    },
    created() {
      this.cardList.forEach((item) => {
        item.tagState = false
      })
      if (!judgeState()) {
        this.$router.push({ name: 'TradingCenter' })
      }
    },
    methods: {
      toTop() {
        this.$router.push({ name: 'SelectPublishType' })
      },
      onSubmit() {
        if (JSON.stringify(this.selectItem) === '{}') {
          // 没有选择类型
          this.$message.warning('请先选择供应类型！')
          return false
        }
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            let projectKey = ''
            switch (this.$route.query.type) {
              case '1':
                // 项目
                projectKey = 'AddProjectMessage'
                break
              case '2':
                // 专利
                projectKey = 'AddPatentMessage'
                break
              case '3':
                // 商标
                projectKey = 'AddBrandMessage'
                break
              default:
                projectKey = 'SelectPublishType'
            }
            if (this.selectItem.type === '1') {
              // 选择的是高端项目
              projectKey = 'HighProjectRegister'
            }
            this.$router.push({
              name: projectKey,
              query: { projectType: this.selectItem.type, type: this.$route.query.type }
            })
          } else {
            return false
          }
        })
      },
      showModal(type) {
        switch (type) {
          case 'promise':
            this.promiseVisible = true
            break
          case 'rule':
            this.ruleVisible = true
            break
        }
      },
      handleCancel(type) {
        switch (type) {
          case 'promise':
            this.promiseVisible = false
            break
          case 'rule':
            this.ruleVisible = false
            break
        }
      },
      changeSelect(item) {
        this.cardList.forEach(a => {
          if (a.id === item.id) {
            a.tagState = true
            this.selectItem = a
          } else {
            a.tagState = false
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../components/main";

  #selectPublishProjectPage {
    .main-css();
    background-color: @main-bg-color;
    overflow: hidden;
    padding: 25px 0 50px;
    h2 {
      font-size: 24px;
      color: #666666;
      text-align: center;
      margin-bottom: 25px;
      font-weight: 900;
    }
    .my-form {
      padding-top: 25px;
    }
    .my-btn-group {
      text-align: center;
      .my-btn {
        width: 90%;
      }
    }

  }
</style>