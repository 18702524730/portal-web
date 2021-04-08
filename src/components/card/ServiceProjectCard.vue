<template>
  <div id="serviceProjectCard">
    <a-card hoverable :bordered="bordered" @click="handleClick(item)">
      <a-row>
        <div style="padding:10px 15px 10px;margin: 0 auto;text-align: center;">
          <a-badge style="height: 150px;width: 100%">
            <template slot="count">
              <div class="div-badge" v-if="item.voucher"><img src="../../assets/images/general/quan.png"
                                                              height="38px" alt="图片不存在"/></div>
            </template>
            <img
              alt="无图片"
              :src="getImgNewView(item.imgUrl)"
              :onerror="defaultImg"
              style="height: 100%;width: 100%;"
            />
          </a-badge>
        </div>
      </a-row>
      <div v-if="haveMoney">
        <p class="head-1">
          <a-tooltip placement="right" :title="item.title" class="span-data" style="-webkit-box-orient: vertical;">
            {{item.title | ellipsis(10)}}
          </a-tooltip>
        </p>
        <p class="head-2"><span>{{newMoney}}</span></p>
      </div>
      <div v-if="haveFoot">
        <div v-if="lineName">
          <div style="padding: 0 15px;">
            <a-divider/>
          </div>
          <p style="font-size: 14px;word-wrap: break-word;word-break: break-all;padding: 0 20px">
            <a-tooltip placement="right" :title="item.orgName" class="span-data" style="-webkit-box-orient: vertical;">
              {{item.orgName | ellipsis(16)}}
            </a-tooltip>
          </p>
        </div>
        <p>
          <a-row class="foot-row">
            <a-col :span="8" :offset="16">
              <a-button-group>
                <a-button icon="user" @click.stop="contactSeller(item)" :disabled="contactBtn"/>
                <a-button icon="heart" @click.stop="yesOrNoCollection(item)"
                          :class="{'click-heart':item.collection}" :disabled="loginBtn"/>
              </a-button-group>
            </a-col>
          </a-row>
        </p>
      </div>
    </a-card>
    <contact-me-modal ref="contactMeRef" @ok="modalFormOk"></contact-me-modal>
  </div>
</template>

<script>
  import moment from 'moment'
  import { getActionUpdateKeyword } from '@/api/manage'
  import { mapGetters } from 'vuex'
  import { getImgNewView, judgmentBrowser, isAdmin } from '@/utils/role'
  import { judgeState } from '@/utils/util'
  import ContactMeModal from './ContactMeModal'

  export default {
    name: 'ServiceProjectCard',
    components: { ContactMeModal },
    inject: ['headLogin'],
    props: {
      item: {
        type: Object,
        default: () => {
        }
      },
      haveFoot: {
        type: Boolean,
        default: false
      },
      bordered: {
        type: Boolean,
        default: false
      },
      haveMoney: {
        type: Boolean,
        default: true
      },
      lineName: {
        type: Boolean,
        default: true
      },
      innerRouter: {
        type: String,
        default: 'ServiceMessage'
      }
    },
    data() {
      return {
        loginBtn: false,
        contactBtn: false,
        defaultImg: 'this.src=\'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png\'',
        username: '游客',
        chatUrl: ''
      }
    },
    created() {
      getActionUpdateKeyword('/zscq/portal/getImurl').then((res) => {
        this.chatUrl = res.imUrl + '/#/imclient?username='
      })
    },
    filters: {
      changeDate(time) {
        if (time === undefined) {
          return
        }
        time = time.replace(/-/g, '/')
        const date = new Date(time)
        return moment(date).format('YYYY-MM-DD')
      },
      ellipsis(value,length) {
        if (value === undefined || value === null) {
          return '无'
        }
        if (!value) {
          return '无'
        }
        if (judgmentBrowser()) {
          return value
        }
        if (value.length > length) {
          return value.substring(0, length) + '...'
        }
        return value
      },
      defaultValue(value) {
        if (value === undefined || value === null) {
          return 'XXXXXXXXX'
        }
        return value
      }
    },
    methods: {
      ...mapGetters(['userInfo', 'nickname']),
      contactSeller(item) {
        if (judgeState()) {
          this.contactBtn = true
          this.$refs.contactMeRef.title = ''
          this.$refs.contactMeRef.orgType = 'orgAgency'
          this.$refs.contactMeRef.disableSubmit = false
          this.$refs.contactMeRef.okButtonHidden = false
          this.$refs.contactMeRef.disabled = false
          this.$refs.contactMeRef.edit(item.orgId, '-1')
          this.contactBtn = false
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
      handleClick(item) {
        const newPage = this.$router.resolve({ name: this.innerRouter, query: { itemId: item.id, orgId: item.orgId } })
        window.open(newPage.href, '_blank')
      },
      onClick() {
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
            console.info(res)
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

      getImgView(text) {
        if (text && text.indexOf(',') > 0) {
          text = text.substring(0, text.indexOf(','))
        }
        return window._CONFIG['imgDomainURL'] + '/' + text
      },
      getImgNewView(text) {
        return getImgNewView(text)
      },
      modalFormOk() {

      }
    },
    computed: {
      'newMoney': function() {
        if (this.item.transactionPrice === '0') {
          return '面议'
        } else {
          return '￥' + this.item.money
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../main";

  #serviceProjectCard {
    .main-css();
    background-color: #ffffff;
    font-size: 16px;
    font-weight: 400;
    font-style: normal;
    color: #666666;
    p {
      text-align: center;
    }
    .head-1, .head-2 {
      font-size: 20px;
    }
    .head-1 {
      margin-top: 0.5em;
      margin-bottom: 0;
      padding: 0 20px;
      word-wrap: break-word;
      word-break: break-all;
    }
    .span-data {
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      /* autoprefixer: off*/
      -webkit-box-orient: vertical;
      /* autoprefixer: on*/
      -webkit-line-clamp: 1;
    }
    .head-2 {
      color: #ff3300;
      margin-bottom: 10px;
    }
    .ant-divider-horizontal {
      margin-bottom: 10px;
      margin-top: 0;
    }
    .heart-button {
      font-size: 20px;
      box-shadow: none;
      border-color: #ffffff;
    }
    /deep/ .ant-card-body {
      padding: 0;
    }
    .div-badge {
      /*background-color: #eb4826;*/
      /*padding: 5px 5px 20px;*/
      /*height: 20px;*/
      /*border-radius: 5px;*/
    }
    /deep/ .click-heart {
      background-color: #4093f7;
      border-color: #4093f7;
      i {
        color: #ffffff;
      }
    }

    .foot-row {
      padding: 0 15px 10px;
    }
  }

</style>