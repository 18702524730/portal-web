<template>
  <div id="hostingServiceOrgCard">
    <a-row>
      <a-col :span="6">
        <a-card>
          <div
            class="my-img-div"
            :style="{backgroundImage:`url(${getImgNewView(item.logo)})`}">
          </div>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card>
          <div class="my-title-div">
            <div>
              <h3>知识产权托管</h3>
              <p>知识产权托管服务</p>
            </div>
          </div>
        </a-card>
      </a-col>
      <a-col :span="10">
        <a-card>
          <div class="my-title-div">
            <div>
              <div class="a-icon">
                <my-icon type="icon-company"/>
                <a @click.stop.prevent.capture="handleClick(item)">
                  <a-tooltip placement="right" :title="item.name"
                             style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis; -webkit-box-orient: vertical;-webkit-line-clamp: 1;">
                    {{item.name | ellipsis2}}
                  </a-tooltip>
                </a>
              </div>
              <div class="my-title-content">
                <span>联系电话：</span><span>{{ item.phone }}</span>
              </div>
              <div class="my-last-content">
                <a-tooltip placement="bottom" :title="item.address"
                           style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis; -webkit-box-orient: vertical;-webkit-line-clamp: 1;">
                  <span class="my-title">联系地址：</span><span>{{item.address | ellipsis}}</span>
                </a-tooltip>
              </div>
              <div class="my-last-content">
                <a-tooltip placement="bottom" :title="item.serviceContentName"
                           style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis; -webkit-box-orient: vertical;-webkit-line-clamp: 1;">
                  <span class="my-title">服务内容：</span><span>{{item.serviceContentName | ellipsis}}</span>
                </a-tooltip>
              </div>
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  import { getImgNewView, judgmentBrowser } from '@/utils/role'

  export default {
    name: 'HostingServiceOrgCard',
    props: {
      item: {
        type: Object,
        default: () => {
          return {}
        }
      },
      innerRouter: {
        type: String,
        default: 'InstitutionHome'
      }
    },
    methods: {
      getImgNewView(text) {
        return encodeURI('\'' + getImgNewView(text) + '\'')
      },
      handleClick(item){
        const newPage = this.$router.resolve({ name: this.innerRouter, query: { orgId: item.id } })
        window.open(newPage.href, '_blank')
      }
    },
    filters: {
      ellipsis(value) {
        if (value === undefined || value === null) {
          return '无'
        }
        if (!value) {
          return '无'
        }
        if (judgmentBrowser()) {
          return value
        }
        if (value.length > 8) {
          return value.substring(0, 8) + '...'
        }
        return value
      },
      ellipsis2(value) {
        if (value === undefined || value === null) {
          return '无'
        }
        if (!value) {
          return '无'
        }
        if (judgmentBrowser()) {
          return value
        }
        if (value.length > 10) {
          return value.substring(0, 10) + '...'
        }
        return value
      }
    }
  }
</script>

<style scoped lang="less">
  #hostingServiceOrgCard {
    margin-bottom: 30px;
    margin-top: 30px;
    .my-img-div {
      background-size: contain;
      height: 150px;
      width: 100%;
      background-repeat: no-repeat;
      background-position: center;
    }
    .my-title-div {
      height: 150px;
      display: flex;
      justify-content: center;
      align-items: center;
      & > div {
        width: 80%;
      }
      h3 {
        margin: 0;
      }
      .my-title-content {
        padding-bottom: 5px;
        span:nth-child(1) {
          color: #666666;
          font-weight: bold;
        }
      }
      .my-last-content{
        padding-bottom: 5px;
        .my-title{
          color: #666666;
          font-weight: bold;
        }
      }
    }
    .a-icon {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      /deep/ svg {
        width: 25px;
        height: 25px;
        color: #1890ff;
      }
      a {
        color: #999999;
        font-size: 14px;
        border-bottom: 1px solid #999999;
        &:hover {
          color: #1890ff;
        }
      }
    }
  }
</style>