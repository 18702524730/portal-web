<template>
  <div id="detailsBody">
    <div class="container">
      <a-list bordered :dataSource="data">
        <a-list-item slot="renderItem" slot-scope="item, index" class="my-list">
          <a-list-item-meta
          >
            <template slot="description">
              <span>
                <span v-if="item.type === '1'" v-html="item.text"
                      style="white-space: pre-wrap;word-break: break-all;overflow-x: auto">
                </span>
                <span v-else>
                  {{ item.text }}
                </span>
              </span>
            </template>
            <template slot="title">
              <span class="font-class" v-if="haveTitle">{{item.title}}</span>
            </template>

          </a-list-item-meta>
        </a-list-item>
        <div slot="header" class="font-class"><span>{{headName}}</span></div>
      </a-list>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailsBody',
    props: {
      headName: {
        type: String,
        default: ''
      },
      data: {
        type: Array,
        default: () => {
          return []
        }
      },
      haveTitle: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {}
    }
  }
</script>

<style scoped lang="less">
  @import "../main";

  #detailsBody {
    .main-css();
    color: #333333;
    background-color: @main-bg-color;
    font-size: 14px;
    overflow: hidden;
    padding: 5px 0;

    .container {
      background-color: #fff;
    }
    .my-list {
      .font-class {
        font-weight: 400;
        font-style: normal;
        font-size: 16px;
        color: #999999;
      }
      .ant-list-item-meta-title {
        display: inline-block;
        width: 15%;
        text-align: right;
        padding-right: 10px;
        vertical-align: middle
      }
      .ant-list-item-meta-description {
        display: inline-block;
        width: 85%;
        vertical-align: middle;
        padding-bottom: 3px;
      }

    }
    .ant-list-bordered .ant-list-item {
      border-bottom: 0
    }
    /deep/ .ant-spin-container {
      margin-top: 15px;
      margin-bottom: 15px;
    }
    .ant-list {
      font-size: 20px;
    }
  }

</style>