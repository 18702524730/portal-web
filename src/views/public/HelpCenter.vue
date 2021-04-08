<template>
  <div id="helpCenter">
    <div class="container">
      <a-layout style="padding-top: 10px">
        <a-layout-sider style="margin-right: 10px;" theme="light" width="21%">
          <side-navigation :data="data" @func="clickData" :focus="focus"></side-navigation>
        </a-layout-sider>
        <a-layout>
          <a-layout-content>
            <content-card :item="item"></content-card>
          </a-layout-content>
        </a-layout>
      </a-layout>
    </div>
  </div>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'
  import SideNavigation from '../../components/table/SideNavigation'
  import ContentCard from '../../components/card/ContentCard'

  export default {
    name: 'HelpCenter',
    components: { ContentCard, SideNavigation },
    data() {
      return {
        collapsed: false,
        url: '/zscq/portal/getHelpInfo',
        data: [],
        item: {},
        focus: ''
      }
    },
    created() {
      this.loadData()
    },
    methods: {
      clickData(item) {
        this.item = item
      },
      loadData() {
        getActionUpdateKeyword(this.url).then((res) => {
          if (res.success) {
            this.data = res.result
            this.handleData(this.data)
          } else {
            this.$message.error(res.message)
          }
        })
      },
      handleData(param) {
        if (this.$route.query.openKeys !== undefined) {
          if (this.$route.query.openKeys === '4') {
            let key = '关于我们'
            if (this.$route.query.itemKeys !== undefined) {
              switch (this.$route.query.itemKeys) {
                case '1':
                  key = '关于我们'
                  break
                case '2':
                  key = '联系我们'
                  break
                case '3':
                  key = '免责声明'
                  break
              }
            }
            const a = param.filter(item => item.itemValue === this.$route.query.openKeys)[0]
            if (a !== undefined && a !== null && a.helpList.length > 0) {
              const b = a.helpList.filter(item => item.title === key)[0]
              if (b !== undefined) {
                this.clickData(b)
                this.focus = b.id
              }
            }
          } else {
            const a = param.filter(item => item.itemValue === this.$route.query.openKeys)[0]
            if (a !== undefined && a !== null && a.helpList.length > 0) {
              this.clickData(a.helpList[0])
              this.focus = a.helpList[0].id
            }
          }
        }
      }
    },
    watch: {
      '$route': {
        handler(newData) {
          if (this.data.length > 0) {
            this.handleData(this.data)
          } else {
            this.loadData()
          }
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../components/main";

  #helpCenter {
    .main-css();
    color: #333333;
    background-color: @main-bg-color;
    font-size: 14px;
    padding-bottom: 10px;
    overflow: hidden;
    .ant-layout-sider {
      border-right: 1px solid #e8e8e8;
    }
  }

</style>