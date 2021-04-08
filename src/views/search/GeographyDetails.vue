<template>
  <div id="geographyDetails">
    <a-spin size="large" :spinning="spinning">
      <div class="container">
        <div class="my-head">
          <a-card hoverable :bordered="false">
            <a-row :gutter="16">
              <a-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                <div class="my-img">
                  <img
                    alt="无图片"
                    :src="getImgNewView(changeImg(item.productImg))"
                    :onerror="'https://img.yzcdn.cn/vant/cat.jpeg'"
                    style="height: 100%;width: 100%"
                  />
                </div>
              </a-col>
              <a-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
                <a-row>
                  <a-col :span="12">
                    <span class="span-title">{{item.productName}}</span>
                  </a-col>
                  <a-col :span="12" style="padding-right: 0;padding-bottom: 1px">
                    <a-button-group style="float: right">
                      <a-button icon="heart" :class="{'click-heart':item.collection}" :disabled="loginBtn"
                                @click.stop="yesOrNoCollection(item)"/>
                    </a-button-group>
                  </a-col>
                  <a-divider/>
                </a-row>
                <a-row class="my-row">
                  <a-col>
                    <a-row class="my-content">
                      <p>
                          <span
                            style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis; -webkit-box-orient: vertical;-webkit-line-clamp: 1;">
                            <a-tooltip :title="item.productNatureName">
                              产品性质：{{item.productNatureName}}
                            </a-tooltip>
                          </span>
                      </p>
                      <p>
                          <span
                            style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis; -webkit-box-orient: vertical;-webkit-line-clamp: 1;">
                            <a-tooltip :title="item.typeName">
                              类目：{{item.typeName}}
                            </a-tooltip>
                          </span>
                      </p>
                      <p>
                          <span
                            style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis; -webkit-box-orient: vertical;-webkit-line-clamp: 1;">
                            <a-tooltip :title="item.areaName">
                              <a-icon type="environment"/>
                              {{item.areaName}}
                            </a-tooltip>
                          </span>
                      </p>
                    </a-row>
                  </a-col>
                </a-row>
              </a-col>
            </a-row>
          </a-card>
        </div>

        <div class="my-body">
          <geography-details-body :item="item"></geography-details-body>
        </div>
      </div>
    </a-spin>
  </div>
</template>

<script>
  import { getImgNewView, isAdmin } from '@/utils/role'
  import GeographyDetailsBody from '../../components/new/card/GeographyDetailsBody'
  import { getActionUpdateKeyword } from '@/api/manage'
  import { judgeState } from '@/utils/util'

  export default {
    name: 'GeographyDetails',
    components: { GeographyDetailsBody },
    inject: ['headLogin'],
    props: {},
    data() {
      return {
        loginBtn: false,
        url: '/zscq/portal/queryGeoIndicationDetailById',
        spinning: false,
        item: {}
      }
    },
    created() {
      this.loadData()
    },
    methods: {
      async loadData() {
        this.spinning = true
        const res = await getActionUpdateKeyword(this.url, { id: this.$route.query.itemId })
        if (res.success) {
          this.item = res.result
          this.item.photoData = this.item.productImg.split(',')
          const fileUrls = []
          if (this.item.standard !== undefined && this.item.standard !== null && this.item.standard !== '') {
            const urls = this.item.standard.split(',')
            urls.forEach(file => {
              file = window._CONFIG['downloadUrl'] + '/' + file
              fileUrls.push(file)
            })
          }
          this.item.fileUrls = fileUrls

        } else {
          this.$message.warning(res.message)
        }
        this.spinning = false
        console.info(res)
        console.info('good')
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
        const collectionChildType = '26'

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
            this.loadData()
          } else {
            that.$message.warning(res.message)
          }
        }).finally(() => {
          that.loginBtn = false
        })
      },
      modalFormOk() {

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
      changeImg(data) {
        if (data) {
          const arr = data.split(',')
          return arr[0]
        }
      }

    },
    filters: {
      filterData(data) {
        if (data || data === 0 || data === '0') {
          return data
        } else {
          return '无'
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../components/main";

  #geographyDetails {
    .main-css();
    color: #333333;
    background-color: @main-bg-color;
    font-size: 14px;
    overflow: hidden;
    padding: 5px;

    /deep/ .ant-card-wider-padding .ant-card-body {
      padding: 24px 32px;;
    }
    .my-img {
      height: 140px;
      width: 100%;
      padding: 0 4px;
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
      margin-bottom: 20px;
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

    .my-content {
      p {
        font-size: 14px;
        color: #333333;
        line-height: 18px;
        margin-bottom: 10px;
      }
      .remark {
        min-height: 60px;
      }
    }
    .my-head, .my-body {
      margin-bottom: 15px;
    }
  }

</style>