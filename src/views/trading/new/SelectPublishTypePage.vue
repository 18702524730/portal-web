<template>
  <div id="selectPublishTypePage">
    <div class="container">
      <h2>为每个人提供简单灵活的发布方式</h2>
      <a-row type="flex" justify="center">
        <a-col :span="8">
          <a-divider><span class="line-title">选择交易类型</span></a-divider>
        </a-col>
      </a-row>
      <a-row :gutter="45">
        <a-col :span="8" v-for="(item,index) in cardList" :key="index">
          <project-flow-card :item="item" @func="changeSelect" :content="false"></project-flow-card>
        </a-col>
      </a-row>

      <a-row type="flex" justify="center" class="my-btn-group">
        <a-col :span="4">
          <a-button class="my-btn" type="primary" size="large" @click="onSubmit">下一步</a-button>
        </a-col>
      </a-row>
    </div>

  </div>
</template>

<script>
  import { judgeState } from '@/utils/util'
  import ProjectFlowCard from '../../../components/new/card/ProjectFlowCard'

  const cardList = [
    {
      id: '1',
      imgUrl: require('@/assets/images/pp5.png'),
      type: '1',
      tagState: false
    },
    {
      id: '2',
      imgUrl: require('@/assets/images/pp1.png'),
      type: '2',
      tagState: false
    },
    {
      id: '3',
      imgUrl: require('@/assets/images/pp2.png'),
      type: '3',
      tagState: false
    }
  ]
  export default {
    name: 'SelectPublishTypePage',
    components: { ProjectFlowCard },
    data() {
      return {
        cardList: cardList,
        selectItem: {},
        type: 'supply'
      }
    },
    created() {
      this.cardList.forEach((item) => {
        item.tagState = false
      })
      if (!judgeState()) {
        this.$router.push({ name: 'TradingCenter' })
      }
    },
    methods: {
      onSubmit() {
        if (JSON.stringify(this.selectItem) === '{}') {
          // 没有选择类型
          this.$message.warning('请先选择交易类型！')
          return false
        }
        if (this.type === 'supply') {
          this.$router.push({ name: 'SelectPublishProject', query: { type: this.selectItem.type } })
        } else {
          let name = ''
          switch (this.selectItem.type) {
            case '1':
              name = 'AddDemandProject'
              break
            case '2':
              name = 'AddDemandPatent'
              break
            case '3':
              name = 'AddDemandBrand'
              break
          }
          this.$router.push({ name: name, query: { type: this.selectItem.type } })
        }

      },
      changeSelect(item) {
        this.cardList.forEach(a => {
          if (a.id === item.id) {
            a.tagState = true
            this.selectItem = a
          } else {
            a.tagState = false
          }
        })
      }
    },
    watch: {
      '$route': {
        handler(data) {
          if (data.name === 'SelectPublishDemandType') {
            this.type = 'demand'
          } else {
            this.type = 'supply'
          }
        },
        deep: true,
        immediate: true
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../components/main";

  #selectPublishTypePage {
    .main-css();
    background-color: @main-bg-color;
    overflow: hidden;
    padding: 50px 0;
    h2 {
      font-size: 24px;
      color: #666666;
      text-align: center;
      margin-bottom: 50px;
      font-weight: 900;
    }
    .my-form {
      padding-top: 50px;
    }
    .my-btn-group {
      text-align: center;
      .my-btn {
        width: 90%;
      }
    }

  }
</style>