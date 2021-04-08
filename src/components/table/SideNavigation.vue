<template>
  <div id="sideNavigation">
    <a-menu theme="light" mode="inline" :selectedKeys="[newFocus]" :openKeys="openKeys" @openChange="onOpenChange"
            @select="onSelect">
      <template v-for="(item,index) in data">
        <a-sub-menu :key="item.itemValue">
          <span slot="title"><a-icon :type="item.description" v-if="item.description !== ''"/><span class="key-size">{{item.itemText}}</span></span>
          <template v-for="(innerItem,innerIndex) in item.helpList" v-if="innerIndex < 20">
            <a-menu-item :key="innerItem.id" @click="onClick(innerItem)">{{innerItem.title}}</a-menu-item>
          </template>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script>
  export default {
    name: 'SideNavigation',
    props: {
      data: {
        type: Array,
        default: () => {
          return []
        }
      },
      focus: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        openKeys: [],
        rootSubmenuKeys: [],
        newFocus: ''
      }
    },
    created() {
      if (this.$route.query.openKeys !== undefined) {
        this.openKeys = []
        this.openKeys.push(this.$route.query.openKeys)
      }
    },
    methods: {
      onClick(item) {
        this.$emit('func', item)
      },
      onSelect(value) {
        this.newFocus = value.key
      },
      onOpenChange(openKeys) {
        const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
          this.openKeys = openKeys
        } else {
          this.openKeys = latestOpenKey ? [latestOpenKey] : []
        }
      }
    },
    watch: {
      data: {
        handler(newData) {
          for (const a of newData) {
            this.rootSubmenuKeys.push(a.itemValue)
          }
        },
        immediate: true
      },
      focus: {
        handler(newData) {
          if (newData !== undefined) {
            this.newFocus = newData
          }
        },
        immediate: true
      },
      '$route': {
        handler(newData) {
          if (this.$route.query.openKeys !== undefined) {
            this.openKeys = []
            this.openKeys.push(this.$route.query.openKeys)
          }
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../main";

  #sideNavigation {
    .main-css();
    min-height: 500px;
    color: #333333;
    background-color: #FFFFFF;
    font-size: 14px;
    overflow: hidden;
    .ant-menu-inline {
      border-right: none;
    }
    .key-size {
      font-size: 15px;
    }
    .ant-menu-item {
      height: 25px;
      line-height: 25px;
    }
  }
</style>