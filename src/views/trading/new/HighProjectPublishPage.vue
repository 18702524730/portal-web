<template>
  <div id="highProjectPublishPage">
    <div class="container">
      <a-card>
        <project-register-head :steps="steps" :item-arr="itemArr" :title="title" :item-all="item"
        ></project-register-head>

        <router-view :audit="false"></router-view>
      </a-card>
    </div>
  </div>
</template>
<script>
  import ProjectRegisterHead from '@/components/new/card/ProjectRegisterHead'
  import { getActionUpdateKeyword } from '@/api/manage'
  import { judgeState } from '@/utils/util'

  export default {
    name: 'HighProjectPublishPage',
    components: { ProjectRegisterHead },
    data() {
      return {
        steps: [
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
            title: '提交'
          }
        ],
        itemArr: [
          [{ title: '登录用户', key: 'realName' }, { title: '项目持有方名称', key: 'orgName' }]
        ],
        title: '高端项目登记',
        current: 1,
        url: '/project/portalProject/getCurrentBaseInfo',
        item: {}
      }
    },
    created() {
      this.getUserData()
      if (!judgeState()) {
        this.$router.push({ name: 'TradingCenter' })
      }
    },
    methods: {
      async getUserData() {
        const res = await getActionUpdateKeyword(this.url)
        if (res.success) {
          this.item = res.result
        } else {
          this.$message.error('请求失败')
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../components/main";

  #highProjectPublishPage {
    background-color: @main-bg-color;
    margin-top: 2px;
    .main-css();
    overflow: hidden;
    padding-top: 20px;
    padding-bottom: 20px;
    .container {
    }
  }
</style>