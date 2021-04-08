<template>
  <div id="financingHeadCard">
    <div class="my-container">
      <h2>{{ title }}</h2>
      <div class="my-step">
        <a-steps :current="current" labelPlacement="vertical">
          <a-step v-for="item in steps" :key="item.title">
            <span slot="title" :class="[item.title.length > 6?'span-first':'']">
              {{item.title}}
            </span>
          </a-step>
        </a-steps>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FinancingHeadCard',
    props: {
      steps: {
        type: Array,
        default: () => {
          return [
            {
              title: '选择质押的专利/商标'
            },
            {
              title: '质押评估分析'
            },
            {
              title: '选择贷款银行'
            },
            {
              title: '提交申请'
            },
            {
              title: '完成'
            }
          ]
        }
      },
      title: {
        type: String,
        default: '质押融资申请'
      },
      current: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {}
    }
  }
</script>

<style scoped lang="less">
  #financingHeadCard {
    .my-container {
      padding: 30px;
      h2 {
        text-align: center;
        font-weight: bold;
      }
      .my-step {
        padding: 20px;
        /deep/ .ant-steps-item-title {
          font-size: 14px;
          white-space: nowrap;
          position: relative;
          .span-first {
            position: absolute;
            left: -65px;
          }
        }
      }
    }
  }
</style>