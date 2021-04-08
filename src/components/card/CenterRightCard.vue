<template>
  <div id="centerRightCard">
    <a-card :bordered="false" style="background-color: #f5f5f5">
      <a-row>
        <div style="height: 150px">
          <img
            alt="无图片"
            src="../../assets/images/datingimgl.png"
            :onerror="defaultImg"
            style="height: 100%;width: 100%"
          />
        </div>
      </a-row>
      <a-row>
        <p class="first-p">已发服务:&nbsp;<span style="font-weight: bold">{{data.productNum | judgeNum}}</span>件</p>
        <a-divider/>
        <p style="padding-top: 10px;margin-bottom: 0.5em">服务类型:&nbsp;<span>{{data.serviceTypeNum | judgeNum}}</span>种
        </p>
        <p>服务机构:&nbsp;<span>{{data.orgNum | judgeNum}}</span>家</p>
        <p>
          <a-button shape="round" type="primary" @click="institutionJoin">服务机构入驻</a-button>
        </p>
      </a-row>

    </a-card>
  </div>
</template>

<script>
  import { isAdmin } from '@/utils/role'
  import { judgeState } from '@/utils/util'

  export default {
    name: 'CenterRightCard',
    inject: ['headLogin'],
    props: {
      data: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        defaultImg: 'this.src=\'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png\''
      }
    },
    methods: {
      institutionJoin() {
        if (judgeState()) {
          // 登录了,跳到主体信息
          if (isAdmin()) {
            this.$message.warning('您没有权限，暂时不能操作!')
            return
          }
          this.$router.push({ path: '/person/partInfo' })
        } else {
          // 没有登录，则先进行登录
          this.$message.warning('请先进行登录！')
          this.headLogin()
        }
      }
    },
    filters: {
      judgeNum(value) {
        if (value === undefined || value === null) {
          return 0
        }
        return value
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../main";

  #centerRightCard {
    .main-css();
    background-color: @main-bg-color;
    font-size: 16px;
    font-weight: 400;
    font-style: normal;
    color: #666666;
    height: 320px;
    p {
      text-align: center;
    }
    .ant-divider-horizontal {
      margin-top: 0;
      margin-bottom: 5px;
    }
    .first-p {
      margin-top: 15px;
      margin-bottom: 10px;
    }
    /deep/ .ant-card-body {
      padding: 0;
    }
  }
</style>