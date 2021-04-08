<template>
  <div class="policyLawsCard">
    <a-card class="my-card">
      <a-tabs type="card" class="myTabs">
        <a-tab-pane :key="outItem.lawsType" :tab="outItem.lawsTypeName" v-for="(outItem,outIndex) in itemList"
                    :forceRender="true" class="myFirstTabs" ref="myFirstTabs">
          <a-tabs
            v-if="outItem.lawsType === '1' || outItem.lawsType === '2' || outItem.lawsType === '3' || outItem.lawsType === '4'">
            <a-tab-pane :key="outItem.lawsType +'-' + item.lawsTypeChild" :tab="item.lawsTypeNameChild"
                        v-for="(item,index) in outItem.data"
                        :forceRender="true" class="mySecondTabs" ref="mySecondTabs">
              <div style="margin-top: 10px">
                <a-row type="flex" justify="space-between" v-for="(onlyItem,onlyIndex) in item.childData"
                       :key="onlyItem.id" v-if="onlyIndex < 5"
                       class="row-p">
                  <a-col :span="20">
                      <span class="span-title" @click="clickItem(onlyItem)">
                        <a-tooltip placement="right" :title="onlyItem.title"
                                   style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis; -webkit-box-orient: vertical;-webkit-line-clamp: 1;"><span style="color: #B4B4B4;padding-right: 5px">•</span>{{ onlyItem.title | ellipsis(30)}}</a-tooltip>
                      </span>
                  </a-col>
                  <a-col :span="4">
                    <span class="span-time" @click="clickItem(onlyItem)">{{onlyItem.releaseDate | changeDate}}</span>
                  </a-col>
                </a-row>
              </div>
            </a-tab-pane>
          </a-tabs>

          <ul v-else>
            <li v-for="(onlyItem,onlyIndex) in outItem.data" :key="onlyItem.id" v-if="onlyIndex < 6"
                @click="clickItem(onlyItem)">
              <a-row type="flex" justify="space-between">
                <a-col :span="20">
                  <span class="span-title"><a-tooltip placement="right" :title="onlyItem.title"
                                                      style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis; -webkit-box-orient: vertical;-webkit-line-clamp: 1;">{{ onlyItem.title }}</a-tooltip></span>
                </a-col>
                <a-col :span="4">
                  <span class="span-time">{{onlyItem.releaseDate | changeDate}}</span>
                </a-col>
              </a-row>

            </li>
          </ul>
        </a-tab-pane>
        <a-button slot="tabBarExtraContent" class="my-btn" @click="moreClick(itemList)">
          查看更多
          <a-icon type="right"/>
        </a-button>
      </a-tabs>
    </a-card>
  </div>
</template>

<script>
  import { judgmentBrowser } from '@/utils/role'

  export default {
    name: 'PolicyLawsCard',
    props: {
      itemList: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data() {
      return {
        keyRoute: 'NewsConsult'
      }
    },
    methods: {
      clickItem(item) {
        const newPage = this.$router.resolve({
          name: 'ArticleMessage',
          query: { id: item.id, keyRoute: this.keyRoute }
        })
        window.open(newPage.href, '_blank')
      },
      moreClick(item) {
        let lawsType = ''
        let lawsTypeChild = ''
        if (this.$refs.mySecondTabs) {
          // 有多级
          const activityFirstTab = this.$refs.myFirstTabs.filter(item => item.active === true)
          const activitySecondTab = this.$refs.mySecondTabs.filter(item => {
            if (item.active === true && item.$vnode.key.split('-')[0] === activityFirstTab[0].$vnode.key) {
              return item
            }
          })
          const arr = activitySecondTab[0].$vnode.key.split('-')
          lawsType = arr[0]
          lawsTypeChild = arr[1]
        } else {
          // 没有多级项，只有单级
          lawsType = item[0].lawsType
        }
        this.$router.push({
          name: 'PolicyList',
          query: { lawsType: lawsType, lawsTypeChild: lawsTypeChild, keyRoute: 'NewsConsult' }
        })
      },
      callback() {

      }
    },
    filters: {
      ellipsis(value, length) {
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
      }
    },
    mounted() {
      const oneTabs = document.getElementsByClassName('policyLawsCard')
      for (const a of oneTabs) {
        const twoTabs = a.getElementsByClassName('ant-tabs-tab')
        for (const b of twoTabs) {
          b.onmouseenter = function() {
            b.click()
          }
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../main";

  .policyLawsCard {
    .my-card {
      height: 280px;
      /deep/ .ant-card-body {
        padding: 0;
      }
      /deep/ .ant-tabs-bar {
        margin: 0;
      }
      ul {
        padding: 0 40px;
        padding-right: 10px;
        li:nth-child(1) {
          padding-top: 15px;
        }
        li {
          line-height: 1;
          padding-bottom: 15px;
          list-style: inherit;
          &:hover {
            cursor: pointer;
            span {
              color: @main-color;
            }
          }
        }
      }
      .span-title {
        font-size: 14px;
        color: black;
      }
      .span-time {
        font-size: 12px;
        color: #999999;
        float: right;
      }
      .my-btn {
        border: none;
        font-size: 12px;
        background-color: #f0f0f0;
        &:hover {
          color: @main-color;
        }
      }

      /deep/ .ant-tabs-bar {
        border-bottom: 2px solid @main-color;
        background-color: #f0f0f0;
        padding-bottom: 1px;
        font-size: 18px;
      }

      /deep/ .ant-tabs-ink-bar {
        background-color: @main-color;
      }
      /deep/ .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
        font-size: 16px;
        border-radius: 0;
        color: @main-font-color;
        background: #f0f0f0;
        border-color: #ffffff;
      }
      /deep/ .ant-tabs-tab-active {
        background: @main-color !important;
        color: #ffffff !important;
      }
      .myFirstTabs {
        /deep/ .ant-tabs-bar {
          border-bottom: 1px solid #e8e8e8;
          background-color: #ffffff;
        }
        /deep/ .ant-tabs-tab-active {
          background-color: #ffffff !important;
          color: @main-color !important;
        }
      }
    }

    .row-p {
      line-height: 35px;
      padding: 0 15px;
      &:hover {
        cursor: pointer;
        span {
          color: @main-color;
        }
      }
    }
  }
</style>