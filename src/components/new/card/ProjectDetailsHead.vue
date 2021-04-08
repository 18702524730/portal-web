<template>
  <div id="projectDetailsHead">
    <div class="container">
      <a-card hoverable :bordered="false">
        <a-row :gutter="16" type="flex" justify="space-between">
          <a-col style="width: 26.2%">
            <div class="my-img-div">
              <img :src="getImgNewView(item[`${itemArr[8].key}`])" alt="项目图片">
            </div>
          </a-col>
          <a-col style="width: 73.8%">
            <a-row>
              <a-col class="span-title" :span="12">
                {{ item[`${itemArr[7].key}`] }}
              </a-col>
              <a-col :span="12">
                <a-button-group style="float: right">
                  <a-button v-if="false">
                    价值评估
                    <a-icon type="pay-circle"/>
                  </a-button>
                  <a-button icon="heart" :class="{'click-heart':item.collection}" :disabled="loginBtn"
                            @click.stop="yesOrNoCollection(item)"/>
                </a-button-group>
              </a-col>
              <a-divider/>
            </a-row>

            <a-row>
              <a-col :span="12" class="my-content">
                <p><span>{{itemArr[0].title}}：</span>
                  <a-tooltip placement="top" :title="item[`${itemArr[0].key}`]"
                             style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis; -webkit-box-orient: vertical;-webkit-line-clamp: 1;">
                    {{item[`${itemArr[0].key}`]}}
                  </a-tooltip>
                </p>
                <p><span>{{itemArr[1].title}}：</span>
                  <a-tooltip placement="top" :title="item[`${itemArr[1].key}`]">{{item[`${itemArr[1].key}`]}}
                  </a-tooltip>
                </p>
                <p><span>{{itemArr[2].title}}：</span>
                  <a-tooltip placement="top" :title="item[`${itemArr[2].key}`]">{{item[`${itemArr[2].key}`]}}
                  </a-tooltip>
                </p>
              </a-col>
              <a-col :span="12" class="my-content">
                <p><span>{{itemArr[3].title}}：</span>
                  <a-tooltip placement="top" :title="item[`${itemArr[3].key}`]">{{item[`${itemArr[3].key}`]}}
                  </a-tooltip>
                </p>
                <p><span>{{itemArr[4].title}}：</span>
                  <span class="money-span">{{ newMoney }}</span>
                </p>
                <p v-if="statusMes"><span>{{itemArr[5].title}}：</span>
                  <a-tooltip placement="top" :title="statusMes">{{statusMes}}
                  </a-tooltip>
                </p>
              </a-col>
            </a-row>

            <a-row>
              <p class="time-p">{{itemArr[6].title}}：{{item[`${itemArr[6].key}`]}}</p>
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
              <a-button icon="check" type="danger" :disabled="buyBtn || statusMes === '已售出'" style="margin-right: 10px;"
                        @click.stop="buyOrder(item)">
                立即购买
              </a-button>
            </a-row>
          </a-col>
        </a-row>
      </a-card>
    </div>
    <contact-me-modal ref="contactMeRef" @ok="modalFormOk"></contact-me-modal>
  </div>
</template>

<script>
  import { judgeState } from '@/utils/util'
  import { getActionUpdateKeyword } from '@/api/manage'
  import ContactMeModal from '../../card/ContactMeModal'
  import { mapGetters } from 'vuex'
  import { isPersonal, isAdmin, getRole, getImgNewView } from '@/utils/role'
  import {
    ACCESS_TOKEN
  } from '@/store/mutation-types'
  import Vue from 'vue'

  export default {
    name: 'ProjectDetailsHead',
    components: { ContactMeModal },
    inject: ['headLogin', 'reload'],
    props: {
      statusMes: {
        type: String,
        default: ''
      },
      item: {
        type: Object,
        default: () => {
        }
      },
      itemArr: {
        type: Array,
        default: () => [
          { title: '所属行业', key: 'belongIndustryName', type: 'text' },
          { title: '项目类型', key: 'projectTypeName', type: 'text' },
          { title: '项目所在地', key: 'madeAreaCodeName', type: 'text' },

          { title: '意向运营方式', key: 'intendedOperationModeName', type: 'tag' },
          { title: '交易价格', key: 'money', type: 'money' },
          { title: '状态', key: 'statusName', type: 'text' },

          { title: '发布日期', key: 'publishTime', type: 'text' },
          { title: '项目名称', key: 'projectName', type: 'text' },
          { title: '项目图片', key: 'imgUrl', type: 'img' }
        ]
      }
    },
    data() {
      return {
        loginBtn: false,
        contactBtn: false,
        buyBtn: false,
        chatUrl: '',
        radioSelect: {},
        getMessageUrl: '/zscq/portal/getSupplyRequiermentCreaterInfo'
      }
    },
    methods: {
      ...mapGetters(['userInfo']),
      changeBtn(e) {
        const obj = this.intendedModeBtn.filter(item => item.id === e.target.value)[0]
        this.radioSelect.id = obj.id
        this.radioSelect.name = obj.name
        if (obj.money === '面议') {
          this.radioSelect.money = obj.money
        } else {
          this.radioSelect.money = obj.moneyNum
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
      buyOrder(item) {
        if (this.statusMes === '已售出') {
          this.$message.warning('该项目已售出，正在对接中，无法购买')
          return false
        }
        if (this.statusMes === '对接中') {
          this.$message.warning('该项目正在对接中，无法购买')
          return false
        }
        if (this.statusMes === '待确认') {
          this.$message.warning('该项目处于待确认，无法购买')
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
            that.reload()
          } else {
            that.$message.warning(res.message)
          }
        }).finally(() => {
          that.loginBtn = false
        })
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
      }
    },
    filters: {
      formattingData(value) {
        if (value === undefined || value === null || value === '') {
          return '无'
        }
        const array = value.split('/')
        if (!value || array.length === 0) {
          return '无'
        }
        return array[array.length - 1]
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
      intendedModeBtn() {
        const arr = []
        if (this.item && this.item.intendedOperationMode) {
          const nameArr = this.item.intendedOperationModeName.split(',')
          const idArr = this.item.intendedOperationMode.split(',')
          for (const i in idArr) {
            if (idArr[i] === undefined || idArr[i] === null || idArr[i] === '') {
              continue
            }
            const obj = {}
            obj.id = idArr[i]
            obj.name = nameArr[i]

            switch (obj.id) {
              case '1':
                obj.money = this.item.zrMoneyStr
                obj.moneyNum = this.item.zrMoney
                obj.moneyWay = this.item.zrTransactionPrice
                break
              case '3':
                obj.money = this.item.gqrzMoneyStr
                obj.moneyNum = this.item.gqrzMoney
                obj.moneyWay = this.item.gqrzTransactionPrice
                break
              case '4':
                obj.money = this.item.zyrzMoneyStr
                obj.moneyNum = this.item.zyrzMoney
                obj.moneyWay = this.item.zyrzTransactionPrice
                break
              case '5':
                obj.money = this.item.dzxkMoneyStr
                obj.moneyNum = this.item.dzxkMoney
                obj.moneyWay = this.item.dzxkTransactionPrice
                break
              case '6':
                obj.money = this.item.ptxkMoneyStr
                obj.moneyNum = this.item.ptxkMoney
                obj.moneyWay = this.item.ptxkTransactionPrice
                break
              case '7':
                obj.money = this.item.putxkMoneyStr
                obj.moneyNum = this.item.putxkMoney
                obj.moneyWay = this.item.putxkTransactionPrice
                break
              default:
                obj.money = '无'
            }
            if (i === 0 || i === '0') {
              this.radioSelect = Object.assign({}, obj)
            }
            arr.push(obj)
          }
        }
        return arr
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../main";

  #projectDetailsHead {
    .main-css();
    color: #333333;
    background-color: @main-bg-color;
    font-size: 14px;
    overflow: hidden;
    padding: 5px 0;
    .my-img-div {
      height: 156px;
      width: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .span-title {
      font-weight: 400;
      font-style: normal;
      font-size: 16px;
      line-height: 28px;
    }
    /deep/ .click-heart {
      background-color: #4093f7;
      border-color: #4093f7;
      i {
        color: #ffffff;
      }
    }
    .ant-divider-horizontal {
      height: 1px;
      background-color: #666666;
      margin-bottom: 8px;
    }
    .my-content {
      p {
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        color: #999999;
        line-height: 28px;
        margin-bottom: 3px;
        display: flex;
        span:nth-child(1) {
          white-space: nowrap;
        }
      }
    }
    .time-p {
      font-weight: 400;
      font-style: normal;
      font-size: 12px;
      color: #999999;
      float: right;
    }
    .money-span {
      color: #ff3300;
    }
    /deep/ .ant-radio-button-wrapper {
      margin: 5px;
      border-radius: 4px;
    }
  }
</style>