<template>
  <div id="institutionCard">
    <a-card>
      <template slot="title">
        <a-tabs defaultActiveKey="1" @change="callback">
          <a-tab-pane tab="机构名片" key="1">
            <div style="background-size: contain;height: 150px;width: 100%;background-repeat: no-repeat;
        background-position: center;" :style="{backgroundImage:`url(${getImgNewView(org.logo)})`}">
            </div>
            <div style="padding-left: 5px;">
              <div>
                <p style="display: inline-block;vertical-align: middle; padding-left:14px;">负责人:&nbsp;</p>
                <p style="display: inline-block;vertical-align: middle;width: 70%;">{{org.legal}}</p>
              </div>

              <p>成立时间:&nbsp;{{org.startDate}}</p>
              <p>联系电话:&nbsp;{{org.phone}}</p>
              <div>
                <p style="display: inline-block;vertical-align: middle;">联系地址:&nbsp;</p>
                <p style="display: inline-block;vertical-align: middle;width: 70%;">{{org.address}}</p>
              </div>
            </div>
          </a-tab-pane>
        </a-tabs>
      </template>
    </a-card>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getImgNewView } from '@/utils/role'
  import { getActionUpdateKeyword } from '@/api/manage'
  import { judgeState } from '@/utils/util'

  export default {
    name: 'InstitutionCard',
    components: {},
    inject: ['headLogin'],
    props: {
      haveGrade: {
        type: Boolean,
        default: true
      },
      org: {
        type: Object,
        default: () => {
          return {}
        }
      },
      requestType: {
        type: String,
        default: 'service'
      }
    },
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
    methods: {
      ...mapGetters(['userInfo', 'nickname']),
      contactSeller() {
        if (judgeState()) {
          if (this.judgeOrg('您不能与本机构发起交流!')) {
            const user = this.userInfo()
            getActionUpdateKeyword('/zscq/portal/getImurl').then((res) => {
              let routeData = res.imUrl + '/#/imclient'
              const param = '?username=' + user.username + '&clientChatId=' + user.id + '&serverChatId=' + this.org.id + '&serverChatName=' + this.org.name
              routeData = routeData + param
              window.open(routeData, '_blank')
            })
          }
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
        if (this.org.id === user.orgId) {
          this.$message.warning(message)
          return false
        } else {
          return true
        }
      },
      callback() {

      },
      getImgView(text) {
        if (text && text.indexOf(',') > 0) {
          text = text.substring(0, text.indexOf(','))
        }
        return encodeURI('\'' + window._CONFIG['imgDomainURL'] + '/' + text + '\'')
      },
      getImgNewView(text) {
        return encodeURI('\'' + getImgNewView(text) + '\'')
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../main";
  #institutionCard {
    .main-css();
    background-color: #ffffff;
    font-size: 16px;
    font-weight: 400;
    font-style: normal;
    color: #000000;
    p {
      margin-bottom: 0;
      padding-top: 5px;
      padding-bottom: 5px;
      word-break: break-all;
      white-space: pre-wrap;
    }
    /deep/ .ant-tabs-tab {
      font-size: 16px;
      padding: 12px 5px;
      margin: 0 43px 0 0;
    }
    .ant-btn {
      /deep/ span {
        font-weight: bold;
      }
    }
    /deep/ .ant-tabs-nav .ant-tabs-tab-active {
      color: @main-color;
    }
    /deep/ .ant-tabs-nav .ant-tabs-tab:hover {
      color: @main-color;
    }
    /deep/ .ant-tabs-ink-bar {
      background-color: @main-color;
    }
  }
</style>