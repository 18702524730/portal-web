<template>
  <div id="plantAddModal">
    <a-modal
      :width="800"
      :visible="visible"
      :maskClosable="false"
      :confirmLoading="confirmLoading"
      switchFullscreen
      :footer="null"
      class="my-modal"
      @cancel="handleCancel">

      <h2>植物新品种添加</h2>
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol">

        <a-form-model-item label="申请号" prop="applyNo">
          <a-input v-model="form.applyNo" placeholder="请输入申请号"></a-input>
        </a-form-model-item>

        <a-form-model-item label="版权人" prop="obligee">
          <a-input v-model="form.obligee" placeholder="请输入版权人"></a-input>
        </a-form-model-item>

        <a-form-model-item label="品种名称" prop="name">
          <a-input v-model="form.name" placeholder="请输入品种名称"></a-input>
        </a-form-model-item>

        <a-form-model-item label="相关证明" :wrapper-col="wrapperInnerCol">
          <a-input type="hidden"></a-input>
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

  export default {
    name: 'PlantAddModal',
    components: { JMoreUpload },
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
          obligee: '',
          name: '',
          qlzm: '',
          wtzm: '',
          key: ''
        },
        rules: {
          applyNo: [{
            required: true, max: 40, message: '请输入申请号,长度在40字以内!'
          }],
          obligee: [{
            required: true, max: 40, message: '请输入版权人,长度在40字以内!'
          }],
          name: [{
            required: true, max: 40, message: '请输入品种名称,长度在40字以内!'
          }]
        },
        downUrl: '/tpls/知识产权转让委托声明20200410.docx',
        downNm: '知识产权转让委托声明20200410.docx'

      }
    },
    created() {
      this.resetPatentValues()
    },
    watch: {
    },
    methods: {
      showModal() {
        this.visible = true
      },
      onSubmit() {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            // 添加到表格的时候，加一个key字段
            this.form.key = Date.parse(new Date())
            this.$emit('func', 'plant', this.form)
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
          obligee: '',
          name: '',
          qlzm: '',
          wtzm: ''
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "./modal";

  #plantAddModal {

  }
</style>