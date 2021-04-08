<template>
  <div id="contentCard">
    <a-card :title="item.title" :style="{'height':minHeight}">
      <div style="margin-bottom: 10px;white-space: pre-wrap;" v-html="item.content">
      </div>
    </a-card>
  </div>
</template>

<script>
  export default {
    name: 'ContentCard',
    props: {
      item: {
        type: Object,
        default: () => {
          return {}
        }
      },
      minHeight: {
        type: String,
        default: '100%'
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../main";

  #contentCard {
    height: 100%;
    background-color: #FFFFFF;
  }
</style>