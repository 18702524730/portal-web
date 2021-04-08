<template>
  <div id="demandOrSupplyCard">
    <a-card hoverable :bordered="bordered" @click="handleClick(item)">
      <a-row class="head-row">
        <a-col style="padding:5px 5px 10px">

          <div style="height: 100px;width: 100px; margin: 22px auto 19px;" v-if="demandOrSupply === 'demand'">
            <a-avatar
              alt="无图片"
              :src="getImgView(item[`${itemKey[0]}`])"
              :onerror="defaultImg"
              style="height: 100%;width: 100%;display: block"
            />
          </div>
          <div v-else-if="demandOrSupply === 'supply'" style="height: 141px;width: 100%;">
            <img
              alt="无图片"
              :src="getImgNewView(item[`${itemKey[0]}`])"
              :onerror="defaultImg"
              style="height: 100%;width: 100%"
            />
          </div>

        </a-col>
      </a-row>
      <a-row class="head-row">
        <a-col>
          <div class="div-list">
            <p class="title-p"><span class="span-title"><a-tooltip placement="right" :title="item[`${itemKey[1]}`]"
                                                                   style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis; -webkit-box-orient: vertical;-webkit-line-clamp: 2;">{{item[`${itemKey[1]}`] | ellipsis}}</a-tooltip></span>
            </p>
            <p v-if="searchData"><span class="span-data" style="-webkit-box-orient: vertical;">{{column[0]}}:<a-tooltip
              placement="right"
              :title="item[`${itemKey[2]}`]">{{item[`${itemKey[2]}`] | formattingData | ellipsis2}}</a-tooltip></span>
            </p>
            <p v-if="searchData && column[1] !== '项目成熟度'"><span class="span-data" style="-webkit-box-orient: vertical;">{{column[1]}}:<a-tooltip
              placement="right"
              :title="item[`${itemKey[3]}`]">{{item[`${itemKey[3]}`] | formattingData | ellipsis2}}</a-tooltip></span>
            </p>
            <p v-if="searchData"><span class="span-data" style="-webkit-box-orient: vertical;">{{column[2]}}:<a-tooltip
              placement="right"
              :title="item[`${itemKey[4]}`]"><span
              v-text="itemKey[4] === 'publishTime' ? changeTime(item[`${itemKey[4]}`]): ellipsisData(item[`${itemKey[4]}`])"></span></a-tooltip></span>
            </p>
            <p v-if="searchDataHaveMoney"><span class="span-data"
                                                style="-webkit-box-orient: vertical;">{{column[3]}}:<span
              style="color:#ff3300"
              v-text="itemKey[5] === 'money'?newMoney:item[`${itemKey[5]}`]"></span></span>
            </p>
          </div>
        </a-col>
      </a-row>
      <a-row class="foot-row" v-if="footHave">
        <a-col :span="16">
          <span class="col-span" style="padding-right: 10px;" v-if="demandOrSupply === 'demand' && searchData"><a-icon
            type="environment"/><a-tooltip placement="top" :title="item[`${itemKey[6]}`]">{{item[`${itemKey[6]}`] | formattingData | ellipsis3}}</a-tooltip></span>
          <span class="col-span"><a-icon type="clock-circle"/>{{item[`${itemKey[7]}`] | changeDate}}</span>
        </a-col>
        <a-col :span="8">
          <a-button-group>
            <a-button icon="user" @click.stop="contactService(item)" :disabled="contactBtn"/>
            <a-button icon="heart" @click.stop="yesOrNoCollection(item)" :class="{'click-heart':item.collection}"
                      :disabled="loginBtn"/>
          </a-button-group>
        </a-col>
      </a-row>
    </a-card>
    <contact-me-modal ref="contactMeRef" @ok="modalFormOk"></contact-me-modal>

  </div>

</template>

<script>
  import { judgeState } from '@/utils/util'
  import moment from 'moment'
  import { getActionUpdateKeyword } from '@/api/manage'

  import { mapGetters } from 'vuex'
  import { getImgNewView, judgmentBrowser, isAdmin } from '@/utils/role'
  import ContactMeModal from './ContactMeModal'

  export default {
    name: 'DemandOrSupplyCard',
    inject: ['headLogin'],
    components: { ContactMeModal },
    props: {
      searchDataHaveMoney: {
        type: Boolean,
        default: true
      },
      searchData: {
        type: Boolean,
        default: true
      },
      oldData: {
        type: Boolean,
        default: true
      },
      bordered: {
        type: Boolean,
        default: false
      },
      keyRoute: {
        type: String,
        default: 'PatentDetails'
      },
      callback: {
        type: Function,
        default: null
      },
      demandOrSupply: {
        type: String,
        default: 'demand'
      },
      item: {
        type: Object,
        default: () => {
          return {}
        }
      },
      footHave: {
        type: Boolean,
        default: true
      },
      column: {
        type: Array,
        default: () => [
          '所属行业',
          '技术领域',
          '交易方式',
          '交易价格'
        ]
      },
      itemKey: {
        type: Array,
        default: () => [
          'imgUrl',
          'title',
          'belongIndustryName',
          'technicalFieldName',
          'intendedOperationModeName',
          'money',
          'cooperationAreaName',
          'publishTime'
        ]
      }

    },
    filters: {
      ellipsis(value) {
        if (value === undefined || value == null) {
          return '无'
        }
        if (!value) {
          return '无'
        }
        if (judgmentBrowser()) {
          return value
        }
        if (value.length > 25) {
          return value.substring(0, 25) + '...'
        }
        return value
      },
      ellipsis2(value) {
        if (value === undefined || value == null) {
          return '无'
        }
        if (!value) {
          return '无'
        }
        if (judgmentBrowser()) {
          return value
        }
        if (value.length > 10) {
          return value.substring(0, 8) + '...'
        }
        return value
      },
      ellipsis3(value) {
        if (value === undefined) {
          return '无'
        }
        if (!value) {
          return '无'
        }
        if (value.length > 3) {
          return value.substring(0, 2) + '...'
        }
        return value
      },
      formattingData(value) {
        if (value === undefined || value == null) {
          return '无'
        }
        const array = value.split('/')
        if (!value || array.length === 0) {
          return '无'
        }
        return array[array.length - 1]
      }
    },
    data() {
      return {
        loginBtn: false,
        contactBtn: false,
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
      changeTime(time) {
        if (time === undefined) {
          return
        }
        time = time.replace(/-/g, '/')
        const date = new Date(time)
        return moment(date).format('YYYY-MM-DD')
      },
      ellipsisData(value) {
        if (value === undefined || value == null) {
          return '无'
        }
        if (!value) {
          return '无'
        }
        if (value.length > 10) {
          return value.substring(0, 8) + '...'
        }
        return value
      },
      getPopupContainer(trigger) {
        return trigger.parentElement
      },
      contactService(item) {
        if (judgeState()) {
          this.getPhoneByItem(item)
        } else {
          this.$message.warning('请先进行登录！')
          this.headLogin()
        }
      },
      modalFormOk() {

      },
      getPhoneByItem(item) {
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
            this.$refs.contactMeRef.edit(res.result.orgId ? res.result.orgId : res.result.userId, res.result.userId)
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
          // bus.$emit('loginModal')
          this.headLogin()
        }
      },
      collectOper(keyRoute) {
        const that = this
        that.loginBtn = true
        let collectionChildType = '1'
        if (keyRoute === 'SupplyProjectDetails') {
          collectionChildType = '1'
        } else if (keyRoute === 'SupplyPatentDetails') {
          collectionChildType = '2'
        } else if (keyRoute === 'ProjectDetails') {
          collectionChildType = '4'
        } else if (keyRoute === 'PatentDetails') {
          collectionChildType = '5'
        }
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
            that.$emit('func')
          } else {
            that.$message.warning(res.message)
          }
        }).finally(() => {
          that.loginBtn = false
        })
      },
      handleClick(item) {
        if (this.oldData) {
          const that = this
          const newPage = that.$router.resolve({ name: `${this.keyRoute}`, query: { id: item.id } })
          window.open(newPage.href, '_blank')
        } else {
          let keyRoute = ''
          switch (item.supplyRequirementType) {
            case '1':
              keyRoute = 'SupplyProjectDetails'
              break
            case '2':
              keyRoute = 'SupplyPatentDetails'
              break
            case '3':
              keyRoute = 'SupplyBrandDetails'
              break
            case '4':
              keyRoute = 'ProjectDetails'
              break
            case '5':
              keyRoute = 'PatentDetails'
              break
            case '6':
              keyRoute = 'BrandDetails'
              break
          }
          const that = this
          const newPage = that.$router.resolve({ name: `${keyRoute}`, query: { id: item.id } })
          window.open(newPage.href, '_blank')
        }
      },
      /* 图片预览 */
      getImgView(text) {
        if (text === null) {
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

  #demandOrSupplyCard {
    .main-css();
    color: #333333;
    background-color: #ffffff;
    font-size: 14px;
    .container {
      padding-top: 20px;
      padding-bottom: 5px;
      background-color: #fff;
    }
    .head-row {
      margin-bottom: 10px;
    }
    .span-data {
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      /* autoprefixer: off*/
      -webkit-box-orient: vertical;
      /* autoprefixer: on*/
      -webkit-line-clamp: 1;
      span {
        margin-left: 5px;
        margin-right: 15px;
      }
    }
    /deep/ .ant-card-body {
      padding: 0;
    }
    .ant-btn-group {
      float: right;
    }
    .col-span {
      font-weight: 400;
      font-style: normal;
      font-size: 12px;
      color: #898989;
      line-height: 28px;
      /deep/ i {
        margin-right: 5px;
      }
    }
    .span-title {
      font-weight: 400;
      font-size: 16px;
      line-height: 20px;
      color: @main-font-color;
    }
    .span-2 {
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    .foot-row {
      padding: 0 15px 10px;
    }
    .div-list {
      p {
        padding: 0 15px;
        margin-bottom: 0;
        font-weight: 400;
        font-style: normal;
        line-height: 22px;
        text-align: left;
        color: #999999;
        word-wrap: break-word;
        word-break: break-all;
      }
    }
    .title-p {
      height: 40px;
      line-height: 20px !important;
      margin-bottom: 5px !important;
      word-wrap: break-word;
      word-break: break-all;
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