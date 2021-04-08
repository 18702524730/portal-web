<template>
  <div id="bankCard">
    <a-card hoverable>
      <a-row>
        <img :src="getImgNewView(item.imgUrl)" :onerror="'https://img.yzcdn.cn/vant/cat.jpeg'" alt="合作机构">
      </a-row>
    </a-card>
  </div>
</template>

<script>
  import { getImgNewView } from '@/utils/role'

  export default {
    name: 'BankCard',
    props: {
      item: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    methods: {
      getImgNewView(text) {
        return getImgNewView(text)
      }
    }
  }
</script>

<style scoped lang="less">
  #bankCard {
    /deep/ .ant-card-body {
      padding: 0;
      img {
        width: 100%;
        height: 70px;
      }
    }
  }
</style>