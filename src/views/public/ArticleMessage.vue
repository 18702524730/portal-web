<template>
  <div id="articleMessage">
    <a-spin size="large" :spinning="spinning">
      <div class="container">
        <a-card :bordered="false" class="inner-card">
          <template slot="title">
            <div style="text-align: center" class="data-title">
              <p style="white-space: pre-wrap;">{{item.title}}</p>
              <span>发布时间:&nbsp;<span>{{item.releaseDate | changeDate }}</span></span>
            </div>
          </template>
          <div v-html="item.content"
               style="margin-bottom: 10px;white-space: pre-wrap;word-break: break-all;font-size: 16px;font-family: sans-serif;color: #000000">
          </div>
          <div>
            <template v-for="(file, index) in fileUrls">
              <a :href="file" style="display: block;margin-left: 20px;" :key="index">
                <a-icon type="file"/>&nbsp;附件 {{index + 1}} : {{file.substr(file.lastIndexOf('/') + 1)}}</a>
            </template>
          </div>
        </a-card>
      </div>
    </a-spin>
  </div>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'

  export default {
    name: 'ArticleMessage',
    props: {
      id: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        item: {},
        url: '/zscq/portal/getInformationById',
        amountUrl: '/zscq/portal/informationPageviewsAdd',
        fileUrls: [],
        spinning: false,

        previewUrl: '/zscq/portal/getPreviewById'
      }
    },
    filters: {},
    created() {
      const preview = this.$route.query.preview
      if (preview === '1') {
        this.getPreviewInfo()
      } else {
        if (this.$route.query && this.$route.query.keyRoute === 'SpecialMessage') {
          this.url = '/zscq/portal/special/getSpecialMessageChildById'
          this.amountUrl = '/zscq/portal/special/SpecialMessageChildPageViewsAdd'
        } else if (this.$route.query && this.$route.query.keyRoute === 'NewsConsult') {
          this.url = '/zscq/portal/policies/getPoliciesRegulationsById'
          this.amountUrl = '/zscq/portal/policies/policiesRegulationsPageViewsAdd'
        }
        this.getInfo()
      }
    },
    methods: {
      async getPreviewInfo() {
        const res = await getActionUpdateKeyword(this.previewUrl, { id: this.$route.query.previewId })
        console.info(res)
        if (res.success) {
          this.item = JSON.parse(res.result.item)
        } else {
          this.$message.error(res.message)
        }
      },
      getInfo() {
        const param = {
          id: this.$route.query.id
        }
        this.spinning = true
        getActionUpdateKeyword(this.url, param).then((res) => {
          if (res.success) {
            this.item = res.result
            if (this.item !== undefined && this.item !== {}) {
              if (this.item.fileUrl !== undefined && this.item.fileUrl !== null && this.item.fileUrl !== '') {
                const urls = this.item.fileUrl.split(',')
                urls.forEach(file => {
                  file = window._CONFIG['downloadUrl'] + '/' + file
                  this.fileUrls.push(file)
                })
              }
            }

            // 成功后得新加一条浏览记录
            getActionUpdateKeyword(this.amountUrl, param)
          } else {
            this.$message.warning(res.message)
          }
          this.spinning = false
        })
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../components/main";

  #articleMessage {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #333333;
    background-color: #ffffff;
    font-size: 14px;
    padding-bottom: 10px;
    margin-bottom: 10px;
    overflow: hidden;
    .container {
      margin-left: auto;
      margin-right: auto;
      width: 1170px;
    }
    .data-title {
      span {
        color: #999999;
        font-size: 14px;
      }
      p {
        padding-top: 20px;
        font-size: 18px;
        font-weight: 900;
      }
    }
    .inner-card {
      margin-left: auto;
      margin-right: auto;
      width: 80%;
    }
    /deep/ .ant-card-body {
      padding: 24px 5px;
    }

  }


</style>