<template>
  <div id="escrowProjectRegisterPage">
    <div class="container">
      <a-card>
        <project-register-head :item-all="item"></project-register-head>

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
    name: 'EscrowProjectRegisterPage',
    components: { ProjectRegisterHead },
    data() {
      return {
        current: 0,
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

  #escrowProjectRegisterPage {
    background-color: @main-bg-color;
    margin-top: 2px;
    .main-css();
    overflow: hidden;
    padding-top: 20px;
    padding-bottom: 20px;
  }
</style>