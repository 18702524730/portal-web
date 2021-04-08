<template>
  <div id="brandAddModal">
    <a-modal
      :width="800"
      :visible="visible"
      :maskClosable="false"
      :confirmLoading="confirmLoading"
      switchFullscreen
      :footer="null"
      class="my-modal"
      @cancel="handleCancel">

      <h2>商标添加</h2>
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol">

        <a-form-model-item label="申请号/注册号" prop="applyNo">
          <a-input v-model="form.applyNo" placeholder="请输入申请号"></a-input>
        </a-form-model-item>

        <a-form-model-item label="权利人" prop="patenter">
          <a-input v-model="form.patenter" placeholder="请输入权利人"></a-input>
        </a-form-model-item>

        <a-form-model-item label="商标类别" prop="trademarkType">
          <j-dict-select-tag placeholder="请选择商标类别" v-model="form.trademarkType"
                             dict-code="trademark_type"></j-dict-select-tag>
        </a-form-model-item>

        <a-form-model-item label="适用范围" prop="applicableField">
          <a-input v-model="form.applicableField" placeholder="请输入适用范围"></a-input>
        </a-form-model-item>

        <a-form-model-item label="商标文件" prop="trademarkImgUrl" :wrapper-col="wrapperInnerCol">
          <j-more-upload fileType="jpg,jpeg,png,bmp,pdf" fileSize="2" fileNum="5" v-model="form.trademarkImgUrl"
                         listType="picture-card" :my-upload="false"></j-more-upload>
        </a-form-model-item>

        <a-form-model-item label="相关证明" :wrapper-col="wrapperInnerCol">
          <a-row class="my-prove-row">
            <a-col :span="18">
              <span class="prove-span">
                权利证明必须上传，若不是自己独有的，还需上传委托证明（仅支持上传jpg、png、bmp、pdf格式文件，文件不能超过2Mb）
              </span>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="10">
              <span class="prove-title">权利证明</span>
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
    </a-modal>
  </div>
</template>

<script>

  import JMoreUpload from '../../general/JMoreUpload'
  import JDictSelectTag from '../../general/JDictSelectTag'

  export default {
    name: 'BrandAddModal',
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
          trademarkType: '',
          applicableField: '',
          trademarkImgUrl: '',
          qlzm: '',
          wtzm: '',
          key: ''
        },
        rules: {
          applyNo: [{
            required: true, max: 40, message: '请输入申请号/注册号,长度在40字以内!'
          }],
          patenter: [{
            required: true, max: 40, message: '请输入权利人,长度在40字以内!'
          }],
          trademarkType: [{
            required: true, message: '请选择商标类别!'
          }],
          applicableField: [{
            required: true, max: 40, message: '请输入适用范围,长度在40字以内!'
          }],
          trademarkImgUrl: [{
            required: true, message: '请上传商标文件!'
          }]
        },
        downUrl: '/tpls/知识产权转让委托声明20200410.docx',
        downNm: '知识产权转让委托声明20200410.docx'

      }
    },
    created() {
      this.resetPatentValues()
    },
    watch: {},
    methods: {
      showModal() {
        this.visible = true
      },
      onSubmit() {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            // 添加到表格的时候，加一个key字段
            this.form.key = Date.parse(new Date())
            this.$emit('func', 'brand', this.form)
            this.handleCancel()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      handleCancel(e) {
        this.resetPatentValues()
        this.visible = false
      },
      resetPatentValues() {
        this.form = {
          applyNo: '',
          patenter: '',
          trademarkType: '',
          applicableField: '',
          trademarkImgUrl: '',
          qlzm: '',
          wtzm: ''
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "./modal";

  #brandAddModal {

  }
</style>