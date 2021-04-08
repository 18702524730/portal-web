<template>
  <div id="patentAddModal">
    <a-modal
      :width="800"
      :visible="visible"
      :maskClosable="false"
      :confirmLoading="confirmLoading"
      switchFullscreen
      :footer="null"
      class="my-modal"
      @cancel="handleCancel">

      <h2>专利添加</h2>
      <a-spin :spinning="confirmLoading">
        <a-form-model
          ref="ruleForm"
          :model="form"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol">

          <a-form-model-item label="申请号" prop="applyNo" :wrapper-col="wrapperInnerCol">
            <a-row display="flex">
              <a-col :span="18">
                <a-input v-model="form.applyNo" placeholder="请输入搜索内容"></a-input>
                <span class="hint-span">示例：CN20102028****.4/20172015****.4/US5646**95</span>
              </a-col>
              <a-col :span="6">
                <a-button type="primary" class="my-btn" @click="onSearch">查询</a-button>
              </a-col>
            </a-row>
          </a-form-model-item>

          <a-form-model-item label="专利权人" prop="name">
            <a-input v-model="form.patenter" :disabled="true"></a-input>
          </a-form-model-item>

          <a-form-model-item label="法律状态" prop="name">
            <j-dict-select-tag v-model="form.status" type="radio" placeholder="请选择法律状态"
                               dict-code="patent_status" :disabled="true"></j-dict-select-tag>
          </a-form-model-item>

          <a-form-model-item label="专利名称" prop="name">
            <a-input v-model="form.patentName" :disabled="true"></a-input>
          </a-form-model-item>

          <a-form-model-item label="专利类型" prop="name">
            <j-dict-select-tag v-model="form.patentType" placeholder="请选择专利类型"
                               dict-code="patent_type" :disabled="true"></j-dict-select-tag>
          </a-form-model-item>

          <a-form-model-item label="相关证明" :wrapper-col="wrapperInnerCol"  prop="qlzm">
            <a-row class="my-prove-row">
              <a-col :span="18">
              <span class="prove-span">
                权利证明必须上传，若不是自己独有的，还需上传委托证明（仅支持上传jpg、png、bmp、pdf格式文件，文件不能超过2Mb）
              </span>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="10">
                <span class="prove-title">权利证明<span style="color: red">*</span></span>
                <j-more-upload fileType="jpg,jpeg,png,bmp,pdf" fileSize="2" fileNum="1" v-model="form.qlzm"
                               listType="picture-card"></j-more-upload>
                <span class="prove-span">
                (上传自己为独有权利人的证<br/>明，受理通知书或授权证书)
              </span>
              </a-col>
              <a-col :span="10">
                <span class="prove-title">委托证明</span>
                <j-more-upload fileType="jpg,jpeg,png,bmp,pdf" fileSize="2" fileNum="1" v-model="form.wtzm"
                               listType="picture-card"></j-more-upload>
                <span class="prove-span">
                (上传转让委托声明)<br/>点击此处 <a :href="downUrl" target="_blank" :download="downNm">下载转让委托声明</a>
              </span>
              </a-col>
            </a-row>


          </a-form-model-item>

          <a-form-model-item :wrapper-col="{ span: 15, offset: 4 }">
            <a-row class="my-bottom-btn">
              <a-col :span="12">
                <a-button type="primary" @click="onSubmit">
                  确认添加
                </a-button>
              </a-col>
              <a-col :span="12">
                <a-button @click="handleCancel">取消</a-button>
              </a-col>
            </a-row>
          </a-form-model-item>
        </a-form-model>
      </a-spin>
    </a-modal>
  </div>
</template>

<script>

  import JMoreUpload from '../../general/JMoreUpload'
  import JDictSelectTag from '../../general/JDictSelectTag'
  import { getActionUpdateKeyword } from '@/api/manage'

  export default {
    name: 'PatentAddModal',
    components: { JDictSelectTag, JMoreUpload },
    data() {
      return {
        title: '新增',
        visible: false,
        confirmLoading: false,
        labelCol: { span: 4 },
        wrapperCol: { span: 15 },
        wrapperInnerCol: { span: 20 },
        form: {
          applyNo: '',
          patenter: '',
          status: '',
          patentName: '',
          patentType: '',
          qlzm: '',
          wtzm: '',
          key: ''
        },
        rules: {
          applyNo: [{
            required: true, max: 40, message: '请输入申请号,长度在40字以内!'
          }],
          qlzm: [{
            required: true, message: '请选择权利证明!'
          }]
        },
        url: '/trusteeship/portalPatentTrusteeship/queryByApplyNo',
        downUrl: '/tpls/知识产权转让委托声明20200410.docx',
        downNm: '知识产权转让委托声明20200410.docx',
        alreadySearch: false
      }
    },
    created() {
      this.resetPatentValues(true)
    },
    watch: {
      'form.applyNo': {
        handler() {
          if (this.alreadySearch) {
            // 查询之后又修改了申请号
            this.$message.warning('申请号查询后修改，请重新查询！')
            this.resetPatentValues()
          }
        }
      }
    },
    methods: {
      onSearch() {
        const applyNo = this.form.applyNo
        this.$refs.ruleForm.validateField('applyNo', valid => {
          if (!valid) {
            this.confirmLoading = true
            getActionUpdateKeyword(this.url, { applyNo: applyNo, functionBlock: '4' }).then((res) => {
              if (res.success) {
                this.confirmLoading = false
                const result = res['result']['obj']
                if (result == null) {
                  this.$message.warning('没有此专利！')
                  this.resetPatentValues()
                  return
                } else {
                  const obj = result
                  console.info(obj)
                  const allRes = {
                    patenter: obj['assignee'],
                    status: obj['validate'],
                    patentName: obj['title'],
                    patentType: obj['type']
                  }
                  this.form = Object.assign(this.form, allRes)
                  // 查询成功
                  this.alreadySearch = true
                }
              }
              if (res.code === 510 || res.code === 500) {
                this.confirmLoading = false
                this.$message.warning(res.message)
                this.resetPatentValues()
              }
            }).finally(() => {
              this.confirmLoading = false
            })
          }
        })


      },
      resetPatentValues(zm = false) {
        if (zm) {
          this.form = {
            applyNo: '',
            patenter: '',
            status: '',
            patentName: '',
            patentType: '',
            qlzm: '',
            wtzm: ''
          }
        } else {
          this.form = {
            applyNo: '',
            patenter: '',
            status: '',
            patentName: '',
            patentType: ''
          }
        }
        this.alreadySearch = false
      },
      showModal() {
        this.visible = true
      },
      onSubmit() {
        if (!this.alreadySearch) {
          this.$message.warning('输入申请号之后，请点击查询！')
          return
        }
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            // 添加到表格的时候，加一个key字段
            this.form.key = Date.parse(new Date())
            this.$emit('func', 'patent', this.form)
            this.resetPatentValues(true)
            this.visible = false
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      handleCancel(e) {
        this.resetPatentValues(true)
        this.visible = false
      }
    }
  }
</script>

<style scoped lang="less">
  @import "./modal";

  #patentAddModal {

  }
</style>