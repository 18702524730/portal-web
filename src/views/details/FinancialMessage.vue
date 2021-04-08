<template>
  <div id="financialMessage">
    <tab-card-template tab-title="基础信息" style="margin-bottom: 5px">
      <template slot="content">
        <div style="margin-top: 10px">
          <a-row :gutter="24">
            <a-col :span="8">
              <div style="padding:10px 15px 10px;margin: 0 auto;text-align: center;">
                <a-badge style="height: 150px;">
                  <template slot="count">
                    <div class="div-badge" v-if="false"><span style="font-size: 12px;color: #ffffff">券</span></div>
                  </template>
                  <img
                    alt="无图片"
                    :src="getImgNewView(productMessage.imgUrl)"
                    :onerror="defaultImg"
                    style="height: 100%;width: 100%;"
                  />
                </a-badge>
              </div>
            </a-col>
            <a-col :span="16">
              <h2 style="font-size: 16px;">{{productMessage.title}}</h2>
              <p>发布日期:&nbsp;<span>{{productMessage.publishTime | changeDate}}</span></p>
              <p>业务类型:&nbsp;<span>{{productMessage.businessType}}</span></p>
              <p>所属机构:&nbsp;<span>{{orgMessage.name}}</span></p>
              <p>
                <a-button icon="user" type="primary" style="margin-right: 10px;" @click="contactSeller(orgMessage)">
                  联系卖家
                </a-button>
              </p>
            </a-col>
          </a-row>
        </div>
      </template>
    </tab-card-template>
    <tab-card-template tab-title="产品功能" style="margin-bottom: 5px">
      <template slot="content">
        <div>
          <p>{{productMessage.serviceRemark}}</p>
        </div>
      </template>
    </tab-card-template>
    <tab-card-template tab-title="产品优势" style="margin-bottom: 5px">
      <template slot="content">
        <div>
          <p>{{productMessage.productAdvantage}}</p>
        </div>
      </template>
    </tab-card-template>
    <tab-card-template tab-title="准入条件" style="margin-bottom: 5px">
      <template slot="content">
        <div>
          <p>{{productMessage.entryCriteria}}</p>
        </div>
      </template>
    </tab-card-template>
    <contact-me-modal ref="contactMeRef" @ok="modalFormOk"></contact-me-modal>
  </div>
</template>

<script>
  import { judgeState } from '@/utils/util'
  import { mapGetters } from 'vuex'
  import { getImgNewView } from '@/utils/role'
  import { getActionUpdateKeyword } from '@/api/manage'
  import TabCardTemplate from '../../components/table/TabCardTemplate'
  import ContactMeModal from '../../components/card/ContactMeModal'

  export default {
    name: 'FinancialMessage',
    inject: ['headLogin'],
    components: { ContactMeModal, TabCardTemplate },
    data() {
      return {
        defaultImg: 'this.src=\'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png\'',
        chatUrl: ''
      }
    },
    created() {
      getActionUpdateKeyword('/zscq/portal/getImurl').then((res) => {
        this.chatUrl = res.imUrl + '/#/imclient?username='
      })
    },
    props: {
      item: {
        type: Object,
        default: () => {
          return {}
        }
      },
      orgMessage: {
        type: Object,
        default: () => {
          return {}
        }
      },
      productMessage: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    filters: {
      ellipsis(value) {
        if (value === undefined) {
          return '无'
        }
        if (!value) {
          return '无'
        }
        if (value.length > 10) {
          return value.substring(0, 8) + '...'
        }
        return value
      }
    },
    methods: {
      ...mapGetters(['nickname', 'avatar', 'userInfo']),
      getImgView(text) {
        if (text && text.indexOf(',') > 0) {
          text = text.substring(0, text.indexOf(','))
        }
        return window._CONFIG['imgDomainURL'] + '/' + text
      },
      getImgNewView(text) {
        return getImgNewView(text)
      },
      judgeOrg(message) {
        const user = this.userInfo()
        if (user.orgId === undefined || user.orgId === null || user.orgId === '') {
          return true
        }
        if (this.productMessage.orgId === user.orgId) {
          this.$message.warning(message)
          return false
        } else {
          return true
        }
      },
      contactSeller(item) {
        if (judgeState()) {
          this.$refs.contactMeRef.title = ''
          this.$refs.contactMeRef.orgType = 'orgFinance'
          this.$refs.contactMeRef.disableSubmit = false
          this.$refs.contactMeRef.okButtonHidden = false
          this.$refs.contactMeRef.disabled = false
          this.$refs.contactMeRef.edit(item.id, '-1')
        } else {
          this.$message.warning('请先进行登录！')
          this.headLogin()
        }
      },
      modalFormOk() {

      }
    },
    watch: {}
  }
</script>

<style scoped lang="less">
  @import "../../components/main";

  #financialMessage {
    .main-css();
    background-color: @main-bg-color;
    font-size: 16px;
    font-weight: 400;
    font-style: normal;
    color: #999999;
    overflow: hidden;
    h2, p {
      margin-bottom: 0;
      padding: 5px;
      white-space: pre-wrap;
      width: 100%;
      span {
        color: #000000;
      }
    }
    .p-title {
      color: #666666;
      font-weight: bold;
    }
  }
</style>