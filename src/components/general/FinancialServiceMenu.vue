<template>
  <div id="financialServiceMenu">
    <div class="container">
      <a-menu
        :defaultSelectedKeys="[newFocus]"
        :selectedKeys="[newFocus]"
        mode="horizontal"
      >
        <template v-for="item in menuList" class="inn-item">
          <a-menu-item v-if="!item.children" :key="item.key">
            <router-link :to="{ name: item.key , query:{itemId:$route.query.itemId, orgId:$route.query.orgId}}">
              {{item.title}}
            </router-link>
          </a-menu-item>
        </template>
        <a-button type="primary" size="large" v-if="title !== ''">{{title}}</a-button>
      </a-menu>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FinancialServiceMenu',
    props: {
      data: {
        type: Object,
        default: () => {
        }
      },
      theme: {
        type: String,
        default: 'light'
      },
      menuList: {
        type: Array,
        default: () => {
          return []
        }
      },
      title: {
        type: String,
        default: ''
      },
      focus: {
        type: String,
        default: ''
      }

    },
    created() {
    },
    computed: {
      newFocus() {
        if (this.focus === 'ServiceMessage') {
          return 'ProjectIntro'
        } else if (this.focus === 'FinancialMessage') {
          return 'FinancialProjectIntro'
        } else {
          return this.focus
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../main";

  #financialServiceMenu {
    .main-css();
    color: #333333;
    background-color: @main-color !important;
    margin-bottom: 10px;
    font-size: 14px;
    .ant-menu-item {
      font-style: normal;
      font-size: 16px;
      padding: 0 20px;
      margin: 0 5px;
      a {
        color: #ffffff;
      }
    }
    .ant-menu-horizontal {
      line-height: 46px;
      white-space: nowrap;
      border: 0;
      border-bottom: 0;
      box-shadow: none;
    }
    /deep/ .ant-menu {
      background-color: @main-color;
      a {
        color: #e0e7f9;
      }
      a:hover {
        opacity: 1;
        font-weight: bold;
      }
      .router-link-active {
        opacity: 1;
        font-weight: bold;
        font-size: 17px;
      }
      /deep/ .ant-menu-item-selected {
        a {
          opacity: 1;
          color: @main-color;
        }
        font-weight: bold;
        font-size: 17px;
        border-color: #ffffff;
        background-color: #ffffff;
        border-radius: 32px;
        line-height: 30px;
        vertical-align: baseline;
      }
      /deep/ .ant-menu-item-active {
        border-color: #ffffff;
      }
    }

  }

</style>