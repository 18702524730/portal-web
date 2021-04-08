<template>
  <div id="opinionAndComplaintCard">
    <div class="container">
      <a-spin :spinning="btnDis" size="large">
        <a-card class="my-card" v-if="submit">
          <h2>{{content[`${type}`].title}}</h2>

          <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules" ref="ruleForm">
            <a-form-model-item :label="content[`${type}`].key + '类型'" prop="childType" ref="childType">
              <j-dict-select-tag placeholder="请选择类型" :dict-code="dictOptions"
                                 v-model="form.childType" :is-options="true"
                                 @input="changeTag('childType')"></j-dict-select-tag>
            </a-form-model-item>
            <a-form-model-item :label="content[`${type}`].key + '内容'" prop="content">
              <a-input v-model="form.content" type="textarea" :placeholder="content[`${type}`].content"/>
            </a-form-model-item>
            <a-form-model-item label="相关图片" prop="image">
              <a-row>
                <a-col :span="18">
                  <j-more-upload fileType="jpg,jpeg,png,bmp,gif" fileSize="2" :fileNum="fileNum + ''"
                                 v-model="form.image"
                                 listType="picture-card" :my-upload="false"></j-more-upload>
                </a-col>
                <a-col :span="6" style="position: relative;height: 112px">
                 <span class="hint-span">
                  共<span class="red-color">{{allNum}}</span>张，还能上传<span class="red-color">{{remainNum}}</span>张
                  </span>
                </a-col>
              </a-row>
            </a-form-model-item>
            <a-form-model-item label="手机号码" prop="phone">
              <a-input v-model="form.phone" placeholder="方便我们与您进行联系"/>
            </a-form-model-item>
          </a-form-model>

          <a-row style="text-align: center">
            <a-button type="primary" size="large" @click="onSubmit" style="width: 200px" :disabled="btnDis">提交</a-button>
          </a-row>
        </a-card>

        <a-card v-else>
          <h2>{{content[`${type}`].title}}</h2>
          <a-row class="my-success-row">
            <a-row class="my-icon">
              <a-icon type="check-circle" theme="twoTone"/>
            </a-row>
            <a-row class="first">
              提交成功
            </a-row>
            <a-row class="second">
              感谢您的支持
            </a-row>
            <a-row>
              <a-button size="large" type="primary" @click="toHome">进入首页</a-button>
            </a-row>
          </a-row>
        </a-card>
      </a-spin>

    </div>
  </div>
</template>

<script>
  import JMoreUpload from '../../components/general/JMoreUpload'
  import { getActionUpdateKeyword, postAction } from '@/api/manage'
  import JDictSelectTag from '../../components/general/JDictSelectTag'
  import { judgeState } from '@/utils/util'
  import { mapGetters } from 'vuex'

  export default {
    name: 'OpinionAndComplaintCard',
    components: { JDictSelectTag, JMoreUpload },
    props: {
      type: {
        type: String
      }
    },
    inject: ['reload'],
    data() {
      return {
        content: {
          '1': {
            title: '在线投诉',
            key: '投诉',
            content: '请输入投诉内容'
          },
          '2': {
            title: '意见建议',
            key: '意见/建议',
            content: '请输入意见/建议内容'
          }
        },
        labelCol: { span: 4, offset: 4 },
        wrapperCol: { span: 10 },
        form: {
          childType: '',
          content: '',
          image: '',
          phone: '',
          type: this.type,
          userId: ''
        },

        dictUrl: '/zscq/portal/training/getComplaintsSuggestionsType',
        url: '/zscq/portal/training/AddComplaintsSuggestions',
        dictOptions: [],
        rules: {
          childType: [{
            required: true,
            message: '请选择类型'
          }],
          content: [{
            required: true,
            message: '请输入内容，最多500个字',
            max: 500
          }],
          phone: [{
            required: true,
            message: '请输入正确格式的手机号码!',
            pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
          }]
        },
        fileNum: 3,
        btnDis: false,
        submit: true
      }
    },
    created() {
      if (!judgeState()) {
        this.$router.push({ name: 'Home' })
      } else {
        this.loadDict()
        const user = this.userInfo()
        this.form.userId = user.id
        this.form.phone = user.phone
      }
    },
    updated() {
    },
    methods: {
      ...mapGetters(['userInfo']),
      toHome() {
        this.$router.push({ name: 'Home' })
      },
      onSubmit() {
        this.btnDis = true
        this.$refs.ruleForm.validate(async valid => {
          if (valid) {
            const res = await postAction(this.url, this.form)
            if (res.success) {
              this.$message.success('提交成功')
              this.submit = false
            } else {
              this.$message.warning(res.message)
            }
            this.btnDis = false
          } else {
            console.log('error submit!!')
            this.btnDis = false
            return false
          }
        })
      },
      changeTag(key) {
        this.$refs[`${key}`].onFieldChange()
      },
      async loadDict() {
        const res = await getActionUpdateKeyword(this.dictUrl)
        if (res.success) {
          this.dictOptions = res.result.complaintsType
        } else {
          this.$message.warning(res.message)
        }
      },
      cleanForm() {
        this.submit = true
        this.$refs.ruleForm.resetFields()
      }
    },
    computed: {
      allNum() {
        if (this.form.image === '') {
          return 0
        }
        const arr = this.form.image.split(',')
        return arr.length
      },
      remainNum() {
        if (this.form.image === '') {
          return this.fileNum
        }
        const arr = this.form.image.split(',')
        return this.fileNum - arr.length
      }
    },
    watch: {
      '$route': {
        handler() {
          this.reload()
        },
        deep: true
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../components/main";

  #opinionAndComplaintCard {
    background-color: @main-bg-color;
    padding: 5px 0;
    .main-css();
    h2 {
      color: #666666;
      font-size: 18px;
      margin-bottom: 2em;
    }
    .my-card {
      .hint-span {
        position: absolute;
        bottom: 0;
        font-size: 12px;
        .red-color {
          color: #ff0000;
        }
      }
    }
    .my-success-row {
      height: 400px;
      text-align: center;
      .ant-btn {
        width: 150px;
      }
      .my-icon {
        font-size: 80px;
      }
      .first {
        font-size: 24px;
        color: #666666;
        margin-bottom: 10px;
      }
      .second {
        font-size: 16px;
        color: #999999;
        margin-bottom: 10px;
      }
    }
  }
</style>