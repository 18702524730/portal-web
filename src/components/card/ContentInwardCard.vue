<template>
  <div id="contentInwardCard">
    <a-card :bordered="bordered" :hoverable="false" style="height: 320px;width: 500px">
      <div class="my-div">
        <template v-for="(innerItem, innerIndex) in item" v-if="innerIndex < 4">
          <p class="title-p" :key="innerIndex">
            <a @click="onClickA(innerItem)">{{innerItem.title}}</a>
          </p>
          <p class="child-p" :key="innerIndex+'c'">
            <template v-for="(threeItem, threeIndex) in innerItem.children" v-if="threeIndex < 8">
              <a @click="onClickA(threeItem)" :key="threeIndex">{{threeItem.title}}</a>&nbsp;&nbsp;&nbsp;
            </template>
          </p>
        </template>
      </div>
    </a-card>
  </div>
</template>

<script>
  export default {
    name: 'ContentInwardCard',
    props: {
      bordered: {
        type: Boolean,
        default: true
      },
      item: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    methods: {
      onClickA(item) {
        if (item) {
          this.$router.push({ name: 'ServiceProject', query: { keyId: item.key } })
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../main";

  #contentInwardCard {
    .main-css();
    background-color: #ffffff;
    font-size: 16px;
    font-weight: 400;
    font-style: normal;
    color: #333333;
    .title-p {
      font-size: 18px;
      margin-bottom: 5px;
      a {
        color: #333333;
        text-decoration: none;
      }
      a:hover {
        color: @main-color;
        text-decoration: underline;
      }
    }
    p {
      margin-bottom: 10px;
    }
    .child-p {
      a {
        color: #666666;
        text-decoration: none;
        font-size: 13px;
      }
      a:hover {
        color: @main-color;
        text-decoration: underline;
      }
    }
    .ant-card-bordered {
      border: 1px solid @main-color;
    }
  }
</style>