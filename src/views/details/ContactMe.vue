<template>
  <div id="contactMe">
    <tab-card-template tab-title="联系我们">
      <template slot="content">
        <div style="padding-left: 20px">
          <h1>
            <a-tooltip placement="right" :title="org.name">{{org.name | ellipsis}}</a-tooltip>
          </h1>
          <p>联系人:&nbsp;<span>{{org.contacts}}</span></p>
          <p>联系电话:&nbsp;<span>{{org.phone}}</span></p>
          <p>联系地址:&nbsp;<span>{{org.address}}</span></p>
          <p>邮编:&nbsp;<span>{{org.postcode}}</span></p>
        </div>
      </template>
    </tab-card-template>
  </div>
</template>

<script>


  import TabCardTemplate from '../../components/table/TabCardTemplate'

  export default {
    name: 'ContactMe',
    components: { TabCardTemplate },
    props: {
      orgMessage: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        org: {}
      }
    },
    watch: {
      orgMessage: {
        handler(newData, oldData) {
          this.org = newData
        },
        deep: true,
        immediate: true
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
        if (value.length > 20) {
          return value.substring(0, 18) + '...'
        }
        return value
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../components/main";

  #contactMe {
    .main-css();
    color: #333333;
    background-color: @main-bg-color;
    font-size: 14px;
    padding-bottom: 10px;
    overflow: hidden;
    p {
      white-space: pre-wrap;
      width: 100%;
    }

  }
</style>