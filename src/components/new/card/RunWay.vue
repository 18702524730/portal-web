<template>
  <div id="runWay">
    <a-row class="main-h4">
      <h4>
        <span>{{ item.name }}</span>
      </h4>
    </a-row>

    <a-row class="my-row" v-for="(innerItem,innerIndex) in item.arr" :key="'i'+innerIndex">
      <a-col>
        <span class="span-title">
            {{ innerItem.name }}：
        </span>
        <span class="span-content">
            {{ getNewMoney(innerItem )}}
        </span>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  export default {
    name: 'RunWay',
    props: {
      item: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    methods: {
      getNewMoney(item) {
        if (item.transactionPrice === '0') {
          return '面议'
        } else {
          return item.money
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../main";

  #runWay {
    margin-bottom: 20px;
    overflow: hidden;

    .my-row {
      margin-bottom: 10px;
      padding-left: 2em;
      padding-right: 2em;
    }
  }
</style>