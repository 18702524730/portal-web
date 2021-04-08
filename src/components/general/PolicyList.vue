<template>
  <div id="policyList">
    <div class="container">
      <a-row v-if="oldData && messageTitle !== ''"><h2 class="header-h">{{messageTitle}}</h2></a-row>
      <a-list itemLayout="horizontal" :dataSource="data" @click="onClick" :pagination="pagination" :loading="loading">
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a-list-item-meta @click.stop="onClickMeta(item)">
            <template slot="description">
              <span>{{item.releaseDate | changeDate}}</span>
              <div>
                <span v-if="!oldData && noMessageOpen">【{{item.typeName}}】</span>
              </div>
            </template>
            <template slot="title">
              <span>{{item.title}}</span>
            </template>
            <template slot="avatar">
              <img
                alt="无图片"
                :src="getImgNewView(item.articleIcons)"
                :onerror="defaultImg"
                style="background-color: #e4e4e4;border-right:5px solid #f5f5f5"
                class="img-size"
              />
            </template>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script>
  import { getImgNewView } from '@/utils/role'

  export default {
    name: 'PolicyList',
    props: {
      messageTitle: {
        type: String,
        default: '相关政策'
      },
      oldData: {
        type: Boolean,
        default: true
      },
      noMessageOpen: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        default: () => {
          return []
        }
      },
      pagination: {},
      loading: {
        type: Object,
        default: () => {
          return {
            spinning: false
          }
        }
      },
      keyRoute: {
        type: String,
        default: 'SpecialMessage'
      },
      routeName: {
        type: String,
        default: 'ArticleMessage'
      }
    },
    data() {
      return {
        defaultImg: 'this.src=\'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png\''
      }
    },
    methods: {
      onClickMeta(item) {
        const newPage = this.$router.resolve({ name: this.routeName, query: { id: item.id, keyRoute: this.keyRoute } })
        window.open(newPage.href, '_blank')
      },
      onClick() {
      },
      getImgView(text) {
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
    }
  }
</script>

<style scoped lang="less">
  @import "../main";

  #policyList {
    .main-css();
    color: #333333;
    background-color: @main-bg-color;
    font-size: 14px;
    padding-bottom: 10px;
    overflow: hidden;
    .ant-list-item-meta {
      background-color: #ffffff;
      cursor: pointer

    }
    .ant-list-item-meta-title {
      font-size: 16px;
      span {
        color: #333333;
        font-weight: normal;
      }
    }
    .ant-list-item-meta-title {
      padding-top: 36px;
      padding-bottom: 14px;
    }
    .header-h {
      color: #666666;
      margin-top: 2em;
      font-style: normal;
      font-size: 18px;
      line-height: 20px;
    }
    .img-size {
      height: 130px;
      width: 230px;
    }
  }

</style>