<template>
  <div id="recommendOrganization">
    <div :class="{'container':oldData}">
      <slot name="title"></slot>
      <a-row v-if="title !== ''"><h2 class="header-h">{{title}}</h2></a-row>
      <div style="margin-top: 10px;min-height: 222px">
        <a-list :grid="grid" :dataSource="data"
                :pagination="pagination" :loading="loading">
          <a-list-item slot="renderItem" slot-scope="item, index">
            <slot name="card" :data="item"></slot>
          </a-list-item>
        </a-list>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'RecommendOrganization',
    components: {},
    props: {
      oldData: {
        type: Boolean,
        default: true
      },
      pagination: {},
      title: {
        type: String,
        default: ''
      },
      data: {
        type: Array,
        default: () => []
      },
      loading: {
        type: Object,
        default: () => {
          return {
            spinning: false
          }
        }
      },
      grid: {
        type: Object,
        default: () => {
          return { gutter: 12, xs: 1, sm: 2, md: 4, lg: 4, xl: 4, xxl: 4 }
        }
      }
    },
    data() {
      return {}
    }
  }
</script>

<style scoped lang="less">
  @import "../main";
  #recommendOrganization {
    .main-css();
    color: #333333;
    background-color: @main-bg-color;
    font-size: 14px;
    padding-bottom: 10px;
    overflow: hidden;
    .header-h {
      color: #666666;
      margin-top: 2em;
      text-align: center;
      font-weight: 700;
      font-style: normal;
      font-size: 20px;
      line-height: 20px;
      margin-bottom: 20px;
    }
  }
</style>