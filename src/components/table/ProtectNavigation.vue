<template>
  <div id="protectNavigation">
    <a-menu theme="light" mode="inline" :selectedKeys="[newFocus]" :openKeys="openKeys" @openChange="onOpenChange"
            @select="onSelect">
      <template v-for="(item,index) in data">
        <a-sub-menu :key="item.type">
          <span slot="title">
            <span class="key-size">
              <a-tooltip :title="item.typeName">
                {{item.typeName}}
              </a-tooltip>
            </span>
          </span>
          <template v-for="(innerItem,innerIndex) in item.childData" v-if="innerIndex < 20">
            <a-menu-item :key="innerItem.id" @click="onClick(innerItem)">
              <a-tooltip :title="innerItem.title" placement="right">
                {{innerItem.title}}
              </a-tooltip>
            </a-menu-item>
          </template>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script>
  export default {
    name: 'ProtectNavigation',
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
          const arr = this.data.filter(item => item.type === latestOpenKey)
          if (arr.length > 0){
            this.newFocus = arr[0].childData[0].id
            this.$emit('func', arr[0].childData[0])
          }
        }
      }
    },
    watch: {
      data: {
        handler(newData) {
          for (const a in newData) {
            if (a === '0') {
              this.openKeys = [newData[a].type]
              if (newData[a].childData.length > 0) {
                this.newFocus = newData[a].childData[0].id
                this.$emit('func', newData[a].childData[0])
              }
            }
            this.rootSubmenuKeys.push(newData[a].type)
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
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../main";

  #protectNavigation {
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