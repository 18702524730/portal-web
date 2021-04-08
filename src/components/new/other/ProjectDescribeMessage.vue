<template>
  <div id="projectDescribeMessage">
    <a-spin size="large" :spinning="spinning">
      <a-row class="main-h3 my-row">
        <h3>项目描述信息</h3>
      </a-row>
      <a-form-model :model="portalProject" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules"
                    ref="ruleForm">
        <a-form-model-item label="项目名称" prop="projectName">
          <a-input v-model="portalProject.projectName" :disabled="true"/>
        </a-form-model-item>
        <a-form-model-item label="解决的技术问题" prop="sloveProblem">
          <a-input v-model="portalProject.sloveProblem" type="textarea" placeholder="请输入解决的技术问题，最多500个字符"
                   id="sloveProblem"/>
        </a-form-model-item>
        <a-form-model-item label="技术领域或适用范围" prop="technicalField">
          <a-input v-model="portalProject.technicalField" type="textarea" placeholder="请输入技术领域或适用范围，最多500个字符"
                   id="technicalField"/>
        </a-form-model-item>
        <a-form-model-item label="项目简介" prop="projectRemark">
          <a-input v-model="portalProject.projectRemark" type="textarea" placeholder="请输入项目简介，最多500个字符"
                   id="projectRemark"/>
        </a-form-model-item>
        <a-form-model-item label="项目展示图片" prop="projectImgUrl" ref="projectImgUrl">
        <span id="projectImgUrl">
          用于展示项目的轮播图片，至多5张，建议尺寸500*500，单个图片最大不超过1M，首张为主图
        </span>
          <j-more-upload fileType="jpg,jpeg,png,bmp,gif" fileSize="1" fileNum="5" v-model="portalProject.projectImgUrl"
                         listType="picture-card" :my-upload="false" @change="changeTag('projectImgUrl')"></j-more-upload>
        </a-form-model-item>

        <a-form-model-item label="项目展示视频" prop="projectVideo">
        <span id="projectVideo">
          仅支持上传一个视频文件，单个文件不超过50M
        </span>
          <j-more-upload fileType="avi,AVI,wmv,WMV,mpg,MPG,mpeg,MPEG,mov,MOV,rm,RM,ram,RAM,swf,SWF,flv,FLV,mp4,MP4"
                         fileSize="50" fileNum="1"
                         v-model="portalProject.projectVideo"
                         listType="picture-card" :my-upload="false"></j-more-upload>
        </a-form-model-item>
        <a-form-model-item label="项目优势" prop="projectAdvantage">
          <a-input v-model="portalProject.projectAdvantage" placeholder="请输入项目优势，最多500个字符" type="textarea"
                   id="projectAdvantage"/>
        </a-form-model-item>
        <a-form-model-item label="项目成熟度" prop="projectMaturity" ref="projectMaturity">
          <j-dict-select-tag type="radio" dict-code="pro_maturity"
                             v-model="portalProject.projectMaturity" id="projectMaturity" @input="changeTag('projectMaturity')"></j-dict-select-tag>
        </a-form-model-item>
        <a-form-model-item label="团队介绍" prop="teamIntroduce">
          <a-input v-model="portalProject.teamIntroduce" placeholder="请输入团队介绍，最多500个字符" type="textarea"
                   id="teamIntroduce"/>
        </a-form-model-item>
        <a-form-model-item label="项目相关文件" prop="otherFiles">
        <span class="my-two-line-span" id="otherFiles">
          可以上传该项目的其他资料，如专利产品的市场情况（如果形成产品的可以用商业合同作为证明材料）、专利获奖情况（获奖证书）、专家点评等信息，可以是word文档，图片等形式的文件
        </span>
          <j-more-upload fileSize="50" fileNum="5" v-model="portalProject.otherFiles"
                         listType="picture-card" :my-upload="false"></j-more-upload>
        </a-form-model-item>
      </a-form-model>

      <a-row class="my-btn-div">
        <a-col :span="6">
          <a-button type="primary" @click="saveDraft" class="my-btn-group" :disabled="btnNotCan">
            保存草稿
          </a-button>
        </a-col>
        <a-col :span="6">
          <a-button type="primary" @click="backTop" class="my-btn-group" :disabled="btnNotCan">
            上一步
          </a-button>
        </a-col>
        <a-col :span="6">
          <a-button type="primary" @click="onSubmit" class="my-btn-group" :disabled="btnNotCan">
            下一步
          </a-button>
        </a-col>
        <a-col :span="6" v-if="portalProject.projectType === '3'">
          <a-button class="my-btn-group" @click="changeType">
            转为托管项目>>
          </a-button>
        </a-col>
      </a-row>
    </a-spin>
  </div>
</template>

<script>
  import JMoreUpload from '../../general/JMoreUpload'
  import JDictSelectTag from '../../general/JDictSelectTag'
  import { getActionUpdateKeyword, postAction } from '@/api/manage'

  export default {
    name: 'ProjectDescribeMessage',
    components: { JDictSelectTag, JMoreUpload },
    data() {
      return {
        spinning: false,
        btnNotCan: false,
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
        portalProject: {
          projectName: '',
          sloveProblem: '',
          technicalField: '',
          projectRemark: '',
          projectImgUrl: '',
          projectVideo: '',
          projectAdvantage: '',
          projectMaturity: '',
          teamIntroduce: '',
          otherFiles: '',

          projectType: this.$route.query.type,
          id: this.$route.query.projectId
        },
        rules: {
          projectName: [{}],
          sloveProblem: [{
            required: true, max: 500, message: '请输入解决的技术问题,最多500个字符!'
          }],
          technicalField: [{
            required: true, max: 500, message: '请输入技术领域或适用范围,最多500个字符!'
          }],
          projectRemark: [{
            required: true, max: 500, message: '请输入项目简介,最多500个字符!'
          }],
          projectImgUrl: [{
            required: true, message: '请上传项目展示图片!', trigger: ['blur', 'change']
          }],
          projectVideo: [{}],
          projectAdvantage: [{
            max: 500, message: '最多500个字符!'
          }],
          projectMaturity: [{
            required: true, message: '请选择项目成熟度!'
          }],
          teamIntroduce: [{
            required: true, max: 500, message: '请输入团队介绍,最多500个字符!'
          }],
          otherFiles: [{
            required: true, message: '请选择项目相关文件!'
          }]
        },
        projectUrl: '/zscq/portal/projectInfolist',
        addDraftUrl: '/project/portalProject/draft',
        checkUrl: '/project/portalProject/projectInfoCheck'
      }
    },
    created() {
      // 如果有id 可能 是编辑或者草稿
      if (this.$route.query && this.$route.query.projectId) {
        this.loadData()
      }
    },
    watch: {},
    methods: {
      changeTag(key){
        this.$refs[`${key}`].onFieldChange()
      },
      async loadData() {
        this.spinning = true
        const param = { projectId: this.$route.query.projectId }
        const res = await getActionUpdateKeyword(this.projectUrl, param)
        if (res.success) {
          Object.assign(this.portalProject, res.result)
          console.info('又获得数据了')
          console.info(this.portalProject)
        } else {
          this.$message.error(res.message)
        }
        this.spinning = false
      },
      async submitData(func) {
        this.btnNotCan = true
        // 保存之前先处理数组
        let notUpdate = true
        if (this.portalProject.projectStatus === '3') {
          // 这是 审核通过的订单，提交之前先校验
          const pres = await postAction(this.checkUrl, this.portalProject)
          notUpdate = pres.success
        }
        let res = {}
        if (!notUpdate) {
          // 修改了 需要提示
          const that = this
          that.$confirm({
            title: '确认提交项目',
            content: '审核通过项目修改后再提交，需要重新审核',
            onOk: async function() {
              that.spinning = true
              res = await postAction(that.addDraftUrl, that.portalProject)
              if (func) {
                func(res)
              }
              that.spinning = false
            }
          })
        } else {
          // 直接 修改
          this.spinning = true
          res = await postAction(this.addDraftUrl, this.portalProject)
          if (func) {
            func(res)
          }
          this.spinning = false
        }
        this.btnNotCan = false

      },
      saveDraft() {
        // 保存之前先判断这个是否是审核通过的
        // 保存草稿
        this.submitData()
      },
      backTop() {
        // 上一步，先保存草稿，跳转到上一个页面
        this.submitData(this.jumpBack)
      },
      onSubmit() {
        // 先校验，再保存，最后跳转
        this.$refs.ruleForm.validate((valid, obj) => {
          if (valid) {
            this.submitData(this.jumpTo)
          } else {
            const key = Object.keys(obj)
            if (key && key.length > 0) {
              document.getElementById(key[0]).scrollIntoView()
            }

            return false
          }
        })
      },
      jumpTo() {
        let name = ''
        switch (this.portalProject.projectType) {
          case '1':
            name = 'HighProjectPublishPreview'
            break
          case '2':
            name = 'EscrowProjectSelectHosingProject'
            break
          case '3':
            name = 'SelfHelpProjectPreview'
            break
          default:
            break
        }
        this.$router.push({
          name: name,
          query: { type: this.portalProject.projectType, projectId: this.portalProject.id }
        })
      },
      jumpBack() {
        let name = ''
        switch (this.portalProject.projectType) {
          case '1':
            name = 'HighProjectPublishBase'
            break
          case '2':
            name = 'EscrowProjectRegisterBase'
            break
          case '3':
            name = 'SelfHelpProjectRegisterBase'
            break
          default:
            break
        }
        this.$router.push({
          name: name,
          query: { type: this.portalProject.projectType, projectId: this.portalProject.id }
        })
      },
      jumpChange() {
        this.$router.push({
          name: 'EscrowProjectRegisterForm',
          query: { type: this.portalProject.projectType, projectId: this.portalProject.id }
        })
      },
      changeType() {
        // 转为自助类型，跳转到自助的起始
        this.portalProject.projectType = '2'
        this.submitData(this.jumpChange)
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../main";

  #projectDescribeMessage {
    font-size: 16px;
    padding-bottom: 20px;
    .main-h3 {
      h3 {
        font-size: 20px;
        color: #666666;
        span {
          font-size: 12px;
          color: #999999;
        }
      }
      margin-bottom: 20px;
    }

    .my-btn-div {
      text-align: center;
      .my-btn-group {
        width: 50%;
      }
    }
    .my-two-line-span {
      line-height: 20px;
    }
  }
</style>