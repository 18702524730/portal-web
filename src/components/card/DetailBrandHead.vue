<template>
  <div id="detailsBrandHead">
    <div class="container">
      <a-card hoverable :bordered="false">
        <a-row :gutter="16" type="flex" justify="space-between">
          <a-col :style="{width:demandOrSupply === 'supply'?'26.2%':'25%'}">
            <div style="height: 100px;width: 100px; margin: 0 auto;" v-if="demandOrSupply === 'demand'">
              <a-avatar
                alt="无图片"
                :src="getImgView(item[`${itemKey[0]}`])"
                :onerror="defaultImg"
                style="height: 100%;width: 100%;display: block"
              />
            </div>
            <div v-else-if="demandOrSupply === 'supply'" style="height: 156px;width: 100%;">
              <img
                alt="无图片"
                :src="getImgNewView(item[`${itemKey[0]}`])"
                :onerror="defaultImg"
                style="height: 100%;width: 100%"
              />
            </div>
          </a-col>
          <a-col :style="{width:demandOrSupply === 'supply'?'73.8%':'75%'}">
            <a-row>
              <a-col :span="12">
                <span class="span-title">{{item[`${itemKey[1]}`]}}</span>
              </a-col>
              <a-col :span="12" style="padding-right: 0;padding-bottom: 1px">
                <a-button-group style="float: right">
                  <!--<a-button icon="user" @click.stop="contactService(item)"  :disabled="contactBtn"/>-->
                  <a-button icon="heart" :class="{'click-heart':item.collection}" :disabled="loginBtn"
                            @click.stop="yesOrNoCollection(item)"/>
                </a-button-group>
              </a-col>
              <a-divider/>
            </a-row>
            <a-row class="my-row">
              <a-col>
                <a-row>
                  <a-col :span="12">
                    <p>商标类别：{{item[`${itemKey[2]}`]}}</p>
                    <p>组合类型：{{item[`${itemKey[3]}`]}}</p>
                    <p v-if="demandOrSupply === 'supply' && statusMes">状态：{{statusMes}}</p>
                  </a-col>
                  <a-col :span="12">
                    <p>
                      <span
                        style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis; -webkit-box-orient: vertical;-webkit-line-clamp: 1;"><a-tooltip
                        placement="top" :title="item[`${itemKey[4]}`]" style="white-space: initial;">行业需求：{{item[`${itemKey[4]}`]}}</a-tooltip></span>
                    </p>
                    <p>交易价格：<span style="color:#ff3300">{{newMoney}}</span></p>
                  </a-col>
                </a-row>
              </a-col>
            </a-row>
            <a-row>
              <p style="float: right" class="time-p">发布日期：{{item[`${itemKey[6]}`]}}</p>
            </a-row>
            <a-row>
              <a-button icon="phone" type="primary" :disabled="contactBtn" style="margin-right: 10px;"
                        @click.stop="contactService(item, true)">
                联系我们
              </a-button>
              <a-button icon="user" type="primary" :disabled="contactBtn" style="margin-right: 10px;"
                        @click.stop="contactService(item, false)">
                在线交流
              </a-button>
              <a-button icon="check" type="danger" :disabled="buyBtn  || statusMes === '已售出'"
                        style="margin-right: 10px;"
                        @click.stop="buyOrder(item)" v-if="demandOrSupply === 'supply'">
                立即购买
              </a-button>
            </a-row>
          </a-col>
        </a-row>
      </a-card>
      <contact-me-modal ref="contactMeRef" @ok="modalFormOk"></contact-me-modal>
    </div>
  </div>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'
  import { mapGetters } from 'vuex'
  import { isPersonal, isAdmin, getRole, getImgNewView } from '@/utils/role'
  import {
    ACCESS_TOKEN
  } from '@/store/mutation-types'
  import Vue from 'vue'
  import { judgeState } from '@/utils/util'
  import ContactMeModal from './ContactMeModal'

  export default {
    name: 'DetailBrandHead',
    inject: ['headLogin'],
    components: { ContactMeModal },
    props: {
      statusMes: {
        type: String,
        default: ''
      },
      demandOrSupply: {
        type: String,
        default: 'demand'
      },
      item: {
        type: Object,
        default: () => {
        }
      },
      itemTitle: {
        type: Array,
        default: () => [
          '商标类别',
          '组合类型',
          '行业需求',
          '交易价格',
          '发布日期'
        ]
      },
      itemKey: {
        type: Array,
        default: () => [
          'imgUrl',
          'title',
          'trademarkTypeName',
          'combinationCategoryName',
          'belongIndustryName',
          'money',
          'publishTime'
        ]
      },
      collectionChildType: {
        type: Number,
        default: 1
      }
    },
    data() {
      return {
        loginBtn: false,
        contactBtn: false,
        buyBtn: false,
        defaultImg: 'this.src=\'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png\'',
        chatUrl: '',
        getMessageUrl: '/zscq/portal/getSupplyRequiermentCreaterInfo',
        defaultIcon: require('../../assets/images/defaultImg.png')
      }
    },
    created() {
      getActionUpdateKeyword('/zscq/portal/getImurl').then((res) => {
        this.chatUrl = res.imUrl + '/#/imclient?username='
      })
    },
    methods: {
      ...mapGetters(['nickname', 'avatar', 'userInfo']),
      buyOrder(item) {
        if (this.statusMes === '已售出') {
          this.$message.warning('该商标已售出，正在对接中，无法购买')
          return false
        }
        if (this.statusMes === '对接中') {
          this.$message.warning('该商标正在对接中，无法购买')
          return false
        }
        if (this.statusMes === '待确认') {
          this.$message.warning('该商标处于待确认，无法购买')
          return false
        }
        if (judgeState()) {
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
      contactService(item, needPopup) {
        if (judgeState()) {
          this.getPhoneByItem(item, needPopup)

        } else {
          this.$message.warning('请先进行登录！')
          this.headLogin()
        }
      },
      getPhoneByItem(item, needPopup) {
        this.contactBtn = true
        getActionUpdateKeyword(this.getMessageUrl, {
          type: item.supplyRequirementType,
          id: item.id
        }).then((res) => {
          if (res.success) {
            if (this.demandOrSupply === 'demand') {
              this.$refs.contactMeRef.orgType = 'orgEnterprise'
            } else {
              this.$refs.contactMeRef.orgType = 'orgAgency'
            }
            this.$refs.contactMeRef.title = ''
            this.$refs.contactMeRef.disableSubmit = false
            this.$refs.contactMeRef.okButtonHidden = false
            this.$refs.contactMeRef.disabled = false
            this.$refs.contactMeRef.edit(res.result.orgId ? res.result.orgId : res.result.userId, res.result.userId, needPopup)
          } else {
            this.$message.warning(res.message)
          }
          this.contactBtn = false
        }).finally(() => {
          this.contactBtn = false
        })
      },
      yesOrNoCollection(item) {
        if (judgeState()) {
          if (isAdmin()) {
            this.$message.warning('您没有权限，暂时不能操作!')
            return
          }
          // 登录了，直接触发收藏或者不收藏
          this.collectOper(this.keyRoute)
        } else {
          // 没有登录，则先进行登录
          this.$message.warning('请先进行登录！')
          this.headLogin()
        }
      },
      collectOper(keyRoute) {
        const that = this
        that.loginBtn = true
        getActionUpdateKeyword('/user/portalCollection/yesOrNoCollection', {
          collectionChildType: this.collectionChildType,
          id: this.item.id
        }).then((res) => {
          if (res.success) {
            if (res.result) {
              that.$message.success('收藏成功！')
            } else {
              that.$message.success('取消收藏成功！')
            }
            that.$emit('func')
          } else {
            that.$message.warning(res.message)
          }
        }).finally(() => {
          that.loginBtn = false
        })
      },
      toLink(item) {

      },
      /* 图片预览 */
      getImgView(text) {
        if (text === null || text === undefined) {
          text = this.defaultIcon
          return text
        }
        if (text && text.indexOf(',') > 0) {
          text = text.substring(0, text.indexOf(','))
        }
        return window._CONFIG['imgDomainURL'] + '/' + text
      },
      getImgNewView(text) {
        return getImgNewView(text)
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
            let orderType = ''
            switch (this.item.supplyRequirementType) {
              case '1':
              case '4':
                orderType = '2'
                break
              case '2':
              case '5':
                orderType = '3'
                break
              case '3':
              case '6':
                orderType = '4'
                break
            }
            this.$router.push({
              name: 'ProjectTradingOrder',
              query: { projectId: this.item.id, orderType: orderType }
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
      judgeOrg(message) {
        const user = this.userInfo()
        if (user.username === this.item.createBy) {
          this.$message.warning('您不能购买自己的项目')
          return false
        }
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
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../main";

  #detailsBrandHead {
    color: #333333;
    background-color: @main-bg-color;
    font-size: 14px;
    overflow: hidden;
    padding: 5px 0;
    .container {
      background-color: #fff;
    }
    /deep/ .ant-card-wider-padding .ant-card-body {
      padding: 24px 32px;;
    }
    .span-title {
      font-weight: 400;
      font-style: normal;
      font-size: 16px;
      line-height: 28px;
    }
    .ant-divider-horizontal {
      height: 1px;
      background-color: #666666;
      margin-bottom: 8px;
    }
    p {
      font-size: 14px;
      font-weight: 400;
      font-style: normal;
      color: #999999;
      line-height: 28px;
      margin-bottom: 3px;
    }
    .time-p {
      font-weight: 400;
      font-style: normal;
      font-size: 12px;
      color: #999999;
    }

    /deep/ .click-heart {
      background-color: #4093f7;
      border-color: #4093f7;
      i {
        color: #ffffff;
      }
    }
  }

</style>