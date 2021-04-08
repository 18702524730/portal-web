<template>
  <div id="hostingOrgCard">
    <a-card hoverable @click="handleClick(item)">
      <a-row>
        <a-radio-group :value="item.tagState">
          <a-radio :value="true">
          </a-radio>
        </a-radio-group>
      </a-row>
      <a-row>
        <div
          class="my-img"
          :style="{backgroundImage:`url(${getImgNewView(item.logo)})`}">
        </div>
      </a-row>
      <a-row class="text-p">
        <p class="first-1">
          <a-tooltip placement="right" :title="item.name"
                     style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis; -webkit-box-orient: vertical;-webkit-line-clamp: 1;">
            {{item.name | ellipsis2}}
          </a-tooltip>
        </p>

        <p class="first-3">
          <a-tooltip placement="right" :title="item.serviceContentName"
                     style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis; -webkit-box-orient: vertical;-webkit-line-clamp: 1;">
            主营业务:{{item.serviceContentName | ellipsis}}
          </a-tooltip>
        </p>

        <p class="first-3">
          <a-tooltip placement="right"
                     style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis; -webkit-box-orient: vertical;-webkit-line-clamp: 1;">
            {{item.cityName | changeData}}
          </a-tooltip>
        </p>

        <p class="a-icon">
          <my-icon type="icon-company" theme="twoTone"/>
          <a @click.stop.prevent.capture="handleNameClick(item)"><span
            style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis; -webkit-box-orient: vertical;-webkit-line-clamp: 1;">{{item.name}}</span></a>
        </p>
      </a-row>

      <a-row class="my-btn-row">
        <a-col>
          <a-button icon="user" type="primary" style="margin-right: 10px;" @click.stop="contactSeller(item)">联系卖家
          </a-button>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
  import { getImgNewView, judgmentBrowser } from '@/utils/role'

  export default {
    name: 'HostingOrgCard',
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
    data() {
      return {
        state: false
      }
    },
    methods: {
      getImgNewView(text) {
        return encodeURI('\'' + getImgNewView(text) + '\'')
      },
      contactSeller(item) {

      },
      handleClick(item) {
        console.info(item)
        console.info('hahahaS')
        this.$emit('func', item)
      },
      handleNameClick(item){
        const newPage = this.$router.resolve({ name: this.innerRouter, query: { orgId: item.id } })
        window.open(newPage.href, '_blank')
      }
    },
    watch: {

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
      },
      changeData(value){
        if (value || value === '0'){
          return value
        }
        return '无'
      }
    }
  }
</script>

<style scoped lang="less">
  #hostingOrgCard {
    .my-img {
      background-size: contain;
      height: 150px;
      width: 100%;
      background-repeat: no-repeat;
      background-position: center;
    }
    /deep/ .ant-card-body {
      padding: 5px;
    }
    .first-1 {
      font-style: normal;
      font-size: 18px;
      line-height: 24px;
      margin-top: 1em;
      margin-bottom: 0.7em;
      word-wrap: break-word;
      word-break: break-all;
    }
    .first-3 {
      font-style: normal;
      font-size: 14px;
      line-height: 24px;
      color: #999999;
      margin-bottom: 2px;
    }

    .text-p {
      p {
        padding-left: 12px;
        padding-right: 12px;
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

    .my-btn-row {
      text-align: center;
      padding-bottom: 10px;
    }
  }
</style>