<template>
  <div id="projectRegisterHead">
    <div class="my-container">
      <h2>{{ title }}</h2>
      <div class="my-step">
        <a-steps :current="current" labelPlacement="vertical">
          <a-step v-for="item in steps" :key="item.title" :title="item.title"/>
        </a-steps>
      </div>
      <div class="my-content" v-if="current === 0">
        <h3>项目持有方信息</h3>
        <div class="my-inner-content">
          <a-row type="flex" justify="center" align="middle" v-for="(outItem,outIndex) in itemArr" :key="outIndex">
            <a-col :span="8" v-for="(item,index) in outItem" :key="item.key">
              <span><span class="my-dot">•</span>{{ item.title }}：</span>
              <span>{{ itemAll[`${item.key}`] | filterData }}</span>
            </a-col>
          </a-row>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'ProjectRegisterHead',
    props: {
      itemAll: {
        type: Object,
        default: () => {
          return {}
        }
      },
      itemArr: {
        type: Array,
        default: () => {
          return [
            [{ title: '登录用户', key: 'realName' }, { title: '项目持有方名称', key: 'orgName' }]
          ]
        }
      },
      steps: {
        type: Array,
        default: () => {
          return [
            {
              title: '持有人信息登记'
            },
            {
              title: '基本信息填写'
            },
            {
              title: '描述信息填写'
            },
            {
              title: '选择托管项目'
            },
            {
              title: '提交'
            }
          ]
        }
      },
      title: {
        type: String,
        default: '托管项目登记'
      }
    },
    data() {
      return {
        current: 0
      }
    },
    watch: {
      '$route': {
        handler(data) {
          switch (data.name) {
            case 'EscrowProjectRegisterForm':
            case 'SelfHelpProjectRegisterForm':
            case 'HighProjectPublishForm':
              this.current = 0
              break
            case 'EscrowProjectRegisterBase':
            case 'SelfHelpProjectRegisterBase':
            case 'HighProjectPublishBase':
              this.current = 1
              break
            case 'EscrowProjectDescribeMessage':
            case 'SelfHelpProjectDescribeMessage':
            case 'HighProjectPublishDescribeMessage':
              this.current = 2
              break
            case 'SelfHelpProjectPreview':
            case 'EscrowProjectSelectHosingProject':
            case 'HighProjectPublishPreview':
              this.current = 3
              break
            case 'EscrowProjectPreview':
              this.current = 4
              break
            default:
              this.current = 0
              break
          }
        },
        deep: true,
        immediate: true
      }
    },
    filters: {
      filterData(value) {
        if (!value) {
          return '无'
        } else {
          return value
        }
      }
    }
  }
</script>

<style scoped lang="less">
  #projectRegisterHead {
    .my-container {
      padding: 30px;
      h2 {
        text-align: center;
        font-weight: bold;
      }
      .my-step {
        padding: 20px 50px;
      }
      .my-content {
        background-color: #eaeaea;
        text-align: center;
        h3 {
          border-bottom: 1px solid #e0e0e0;
          margin: 0;
          padding-top: 10px;
          padding-bottom: 10px;
          font-size: 14px;
        }
        .my-inner-content {
          padding: 20px;
          text-align: left;
          span {
            color: #666666;
          }
          .my-dot {
            color: #1890ff;
            font-size: 20px;
            padding-right: 10px;
          }
        }
      }
    }
  }
</style>