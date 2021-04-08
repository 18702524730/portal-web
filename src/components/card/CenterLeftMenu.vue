<template>
  <div id="centerLeftMenu">
    <a-menu style="width: 100%;height: 320px" mode="vertical">

      <template v-for="(item,index) in tableList" v-if="index < 6">
        <a-sub-menu :key="index">
          <template slot="title">
            <div @click="handleClick(item)">
              <img :src="icons[index]" alt="无图片" style="width: 18px;height: 18px"/>
              <span class="title-span"><a-tooltip placement="top"
                                                  :title="item.title">{{item.title | ellipsis}}</a-tooltip></span>
            </div>
          </template>
          <content-inward-card :item="item.children" v-if="item.children.length >0"></content-inward-card>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'
  import ContentInwardCard from './ContentInwardCard'

  export default {
    name: 'CenterLeftMenu',
    components: { ContentInwardCard },
    data() {
      return {
        url: '/zscq/portal/getServiceTypeTreeNode',
        tableList: [],
        icons: [
          require('../../assets/images/general/i1.png'),
          require('../../assets/images/general/i2.png'),
          require('../../assets/images/general/i3.png'),
          require('../../assets/images/general/i4.png'),
          require('../../assets/images/general/i5.png'),
          require('../../assets/images/general/i6.png')
        ]
      }
    },
    created() {
      this.loadData()
    },
    methods: {
      handleClick(item) {
        if (item) {
          this.$router.push({ name: 'ServiceProject', query: { keyId: item.key } })
        }
      },
      loadData() {
        getActionUpdateKeyword(this.url).then((res) => {
          if (res.success) {
            this.tableList = res.result
            console.info(this.tableList)
          } else {
            this.$message.warning(res.message)
          }

        })
      }
    },
    filters: {
      ellipsis(value) {
        if (value === undefined) {
          return '无'
        }
        if (!value) {
          return '无'
        }
        if (value.length > 10) {
          return value.substring(0, 9) + '...'
        }
        return value
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../main";

  #centerLeftMenu {
    .main-css();
    color: #333333;
    font-size: 14px;
    margin-top: 5px;
    .title-span {
      padding-left: 5px;
      font-size: 16px;
    }
    .ant-menu-inline, .ant-menu-vertical, .ant-menu-vertical-left {
      border: 1px solid @main-color;
    }
    .ant-menu-submenu {
      border-bottom: 1px solid @main-bg-color;
      border-top: 1px solid @main-bg-color;
    }
    /deep/ .ant-menu {
      .ant-menu-item:hover,
      .ant-menu-submenu-title:hover {
        color: @main-color;
        .ant-menu-submenu-arrow {
          &::after,
          &::before {
            background: linear-gradient(to right, @main-color, @main-color);
          }
        }
      }
      .ant-menu-submenu:hover {
        border-color: @main-color;
        border-right: 1px solid #ffffff;
        margin-right: -1px;
      }
    }
  }
</style>