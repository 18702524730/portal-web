<template>
  <div id="serviceMessage">
    <tab-card-template tab-title="服务信息" style="margin-bottom: 5px">
      <template slot="content">

        <div style="margin-top: 10px">
          <a-spin :spinning="spinning" size="large" :delay="500">
            <a-row :gutter="12">
              <a-col :span="8">
                <service-project-card :have-money="false" :bordered="true" :item="item"></service-project-card>
              </a-col>
              <a-col :span="16">
                <a-row>
                  <a-col :span="19"><h2 style="font-size: 16px;">{{item.title}}</h2></a-col>
                  <a-col :span="5">
                    <a-button icon="heart" class="heart-button" :class="{'click-heart':item.collection}"
                              @click.stop="yesOrNoCollection(item)" :disabled="collectionBtn"></a-button>
                  </a-col>
                </a-row>

                <p>发布日期:&nbsp;<span>{{item.publishTime | changeDate}}</span></p>
                <p>服务价格:&nbsp;<span style="font-size: 20px;color: #ff3300;font-weight: 900">{{newMoney}}</span></p>
                <p>服务评价:&nbsp;<span><a-rate :value="avgScoreValue" disabled style="fontSize: 14px"
                                            allowHalf/></span></p>
                <p v-if="item.projectIds !== undefined && item.projectIds.length > 0">服务项目:&nbsp;<span>
                  <template v-for="(project,key) in item.projectNames" v-if="project !== null">
                    <span :key="key" style="padding-right: 5px;">
                      <a-icon type="check-circle" theme="twoTone" twoToneColor="#52c41a"/>
                      <span>{{project}}</span>
                    </span>
                  </template>
                </span>
                </p>
                <p>已成交数量:&nbsp;<span>{{orderNums}}</span></p>
                <p>
                  <a-button icon="phone" type="primary" style="margin-right: 10px;" @click="contactSeller(item, true)" :disabled="contactBtn">联系卖家
                  </a-button>
                  <a-button icon="user" type="primary" style="margin-right: 10px;" @click="contactSeller(item, false)" :disabled="contactBtn">在线交流
                  </a-button>
                  <a-button type="danger" icon="check" @click="applyService" :disabled="loginBtn || notRemain"
                            :class="{'not-remain':notRemain}">购买服务
                  </a-button>
                </p>
              </a-col>
            </a-row>
          </a-spin>
        </div>
      </template>
    </tab-card-template>

    <tab-card-template tab-title="服务介绍" tab-title2="服务评价" :two-tabs="true" ref="twoTab">
      <template slot="content">
        <div v-html="item.serviceRemark" style="white-space: pre-wrap;word-break: break-all;">

        </div>
      </template>

      <template slot="second">
        <div>
          <service-evaluate :service-product-id="item.id" style="white-space: normal"></service-evaluate>
        </div>
      </template>
    </tab-card-template>
    <contact-me-modal ref="contactMeRef" @ok="modalFormOk"></contact-me-modal>
  </div>
</template>

<script>
  import { isPersonal, isAdmin, getRole } from '@/utils/role'
  import moment from 'moment'
  import { getActionUpdateKeyword } from '@/api/manage'
  import { judgeState } from '@/utils/util'
  import {
    INFORMATION_ITEM,
    ACCESS_TOKEN
  } from '@/store/mutation-types'
  import Vue from 'vue'

  import { mapGetters } from 'vuex'
  import TabCardTemplate from '../../components/table/TabCardTemplate'
  import ServiceProjectCard from '../../components/card/ServiceProjectCard'
  import ServiceEvaluate from '../../components/card/ServiceEvaluate'
  import ContactMeModal from '../../components/card/ContactMeModal'


  export default {
    name: 'ServiceMessage',
    inject: ['headLogin'],
    components: { ContactMeModal, ServiceEvaluate, ServiceProjectCard, TabCardTemplate },
    props: {
      test: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        item: {},
        url: '/zscq/portal/getAgencyProductDetail',
        spinning: false,
        loginBtn: false,
        collectionBtn: false,
        duration: 5,
        chatUrl: '',
        notRemain: false,

        contactBtn: false,

        previewUrl: '/zscq/portal/getPreviewById'
      }
    },
    created() {
      if (this.$route.query.preview === "1"){
        this.loginBtn = true
        this.contactBtn = true
        this.getPreviewInfo()
      } else {
        this.loadData(this.$route.query.itemId)
        getActionUpdateKeyword('/zscq/portal/getImurl').then((res) => {
          this.chatUrl = res.imUrl + '/#/imclient?username='
        })
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
      ...mapGetters(['nickname', 'avatar', 'userInfo', 'serviceItem']),
      async getPreviewInfo() {
        const res = await getActionUpdateKeyword(this.previewUrl, { id: this.$route.query.previewId })
        console.info(res)
        if (res.success) {
          this.item = JSON.parse(res.result.item)
        } else {
          this.$message.error(res.message)
        }
      },
      yesOrNoCollection(item) {
        if (judgeState()) {
          if (isAdmin()) {
            this.$message.warning('您没有权限，暂时不能操作!')
            return
          }
          // 登录了，直接触发收藏或者不收藏
          this.collectOper()
        } else {
          // 没有登录，则先进行登录
          this.$message.warning('请先进行登录！')
          this.headLogin()
        }
      },
      collectOper() {
        const that = this
        that.loginBtn = true
        const collectionChildType = '7'
        getActionUpdateKeyword('/user/portalCollection/yesOrNoCollection', {
          collectionChildType: collectionChildType,
          id: this.item.id
        }).then((res) => {
          if (res.success) {
            if (res.result) {
              that.$message.success('收藏成功！')
            } else {
              that.$message.success('取消收藏成功！')
            }
            that.loadData(this.$route.query.itemId)
          } else {
            that.$message.warning(res.message)
          }
          that.loginBtn = false
        }).finally(() => {
          that.loginBtn = false
        })
      },
      loadData(data) {
        const preview = this.$route.query.preview
        if (preview === '1') {
          const a = Vue.ls.get(INFORMATION_ITEM)
          const items = JSON.parse(a.item)
          this.item = items
        } else {
          const param = {
            id: data
          }
          this.spinning = true
          getActionUpdateKeyword(this.url, param).then((res) => {
            if (res.success) {
              this.item = res.result
            }
            this.spinning = false
          }).finally(() => {
            this.spinning = false
          })
        }

      },
      changeTime(time) {
        if (time === undefined) {
          return
        }
        time = time.replace(/-/g, '/')
        const date = new Date(time)
        return moment(date).format('YYYY-MM-DD')
      },
      applyService() {
        if (judgeState()) {
          // 登录了，直接触发收藏或者不收藏
          if (isAdmin()) {
            this.$message.warning('您没有权限，暂时不能操作！')
            return
          }
          if (this.judgeOrg('您不能申请本机构发布的服务!')) {
            this.judagRealName()
          }
        } else {
          this.$message.warning('请先进行登录！')
          this.headLogin()
        }
      },
      contactSeller(item, needPopup) {
        if (judgeState()) {
          this.$refs.contactMeRef.title = ''
          this.$refs.contactMeRef.orgType = 'orgAgency'
          this.$refs.contactMeRef.disableSubmit = false
          this.$refs.contactMeRef.okButtonHidden = false
          this.$refs.contactMeRef.disabled = false
          this.$refs.contactMeRef.edit(item.orgId, '-1', needPopup)
        } else {
          this.$message.warning('请先进行登录！')
          this.headLogin()
        }
      },
      judgeOrg(message) {
        const user = this.userInfo()
        if (user.orgId === undefined || user.orgId === null || user.orgId === '') {
          return true
        }
        if (this.item.orgId === user.orgId) {
          this.$message.warning(message)
          return false
        } else {
          return true
        }
      },
      judagRealName() {
        const user = this.userInfo()
        const role = getRole()
        this.loginBtn = true
        getActionUpdateKeyword('/user/portalUserCert/nameCertification', {
          username: user.username,
          roleCode: role
        }).then((res) => {
          if (res.success) {
            this.$router.push({
              name: 'ServiceOrder',
              query: { itemId: this.$route.query.itemId, orgId: this.$route.query.orgId }
            })
          } else {
            const token = Vue.ls.get(ACCESS_TOKEN)
            if (isPersonal()) {
              // 这是个人
              const path = '/user/portalUserCert'
              const newUrl = window._CONFIG['userCenterToURL'] + '?token=' + token + '&redirectUrl=' + path
              window.open(newUrl)
              this.$message.warning('您还未进行实名认证，请先认证')
            } else {
              const path = '/person/partInfo'
              const newUrl = window._CONFIG['userCenterToURL'] + '?token=' + token + '&redirectUrl=' + path
              window.open(newUrl)
              // this.$router.push({ path: '/person/partInfo' })
              this.$message.warning('您还未进行主体认证，请先认证')
            }
          }
          this.loginBtn = false
        }).finally(() => {
          this.loginBtn = false
        })
      },
      modalFormOk() {

      }
    },
    computed: {
      'newMoney': function() {
        if (this.item.transactionPrice === '0') {
          return '面议'
        } else {
          return this.item.money
        }
      },
      'orderNums': function() {
        const applyNum = this.item.serviceOrderNum === null ? 0 : this.item.serviceOrderNum
        return applyNum
      },
      'avgScoreValue': function() {
        if (this.item.avgScore === undefined || this.item.avgScore === null || this.item.avgScore === '') {
          return 5
        } else {
          return this.item.avgScore
        }
      }
    },
    beforeRouteEnter(to, from, next) {
      if (from.path === '/trade/serviceEval') {
        next(vm => {
          vm.$refs.twoTab.callback('2')
        })
      } else {
        next()
      }
    },
    watch: {}

  }
</script>

<style scoped lang="less">
  @import "../../components/main";

  #serviceMessage {
    .main-css();
    background-color: @main-bg-color;
    font-size: 16px;
    font-weight: 400;
    font-style: normal;
    color: #333333;
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
    .not-remain {
      opacity: 0.6;
    }
    .p-title {
      color: #666666;
      font-weight: bold;
    }
    /deep/ .click-heart {
      background-color: #4093f7;
      border-color: #4093f7;
      i {
        color: #ffffff;
      }
    }
    .ant-btn-danger {
      color: #ffffff;
      background-color: #eb4826;
      border-color: #eb4826;
    }
    .ant-btn-danger:hover {
      opacity: 0.6;
    }
  }
</style>