<template>
  <div>
    <friendship-link></friendship-link>
    <div id="doorFooter">
      <div class="container">
        <a-row :gutter="16">
          <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="left-col">

            <a-col :xs="24" :sm="15" :md="15" :lg="15" :xl="15">
              <h2>相关链接</h2>
              <ul>
                <li><a href="http://www.cnipa.gov.cn" target="_blank">国家知识产权局</a></li>
                <li><a href="https://scjg.xm.gov.cn/" target="_blank">厦门市市场监督管理局（知识产权局）</a></li>
                <li><a href="http://www.xm12330.com/" target="_blank">厦门知识产权维权援助中心</a></li>
                <li><a href="http://www.xmsme.cn/" target="_blank">厦门市中小企业公共服务平台</a></li>
              </ul>
            </a-col>

            <a-col :xs="24" :sm="9" :md="9" :lg="9" :xl="9">
              <h2>其他</h2>
              <ul>
                <li>
                  <router-link :to="{name:'HelpCenter',query:{openKeys:'4',itemKeys:'1'}}">关于我们</router-link>
                </li>
                <li>
                  <router-link :to="{name:'HelpCenter',query:{openKeys:'4',itemKeys:'2'}}">联系我们</router-link>
                </li>
              </ul>
            </a-col>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="pho-psi" style="margin-top: 50px;">
              <a-row :gutter="24">
                <a-col :span="12" style="text-align: end">
                  <img src="../../assets/images/qr.jpg" style="height: 110px;width: 110px;"/>
                </a-col>
                <a-col :span="12">

                  <p>周一至周五：08:30-17:00</p>
                  <p style="color: #2f72d1;font-size: 25px">0592-3576688</p>
                  <p>客服QQ1：2235515915</p>
                  <p>客服QQ2：2964633698</p>
                  <!--<p>周一至周五 9：00 — 17：00</p>-->
                </a-col>
              </a-row>

            </div>
          </a-col>
        </a-row>
      </div>
      <a-divider></a-divider>
      <a-row :gutter="16" type="flex" justify="center" align="top">
        <a-col class="lastFoot">
          <a-breadcrumb separator="|" class="myBreadCrumb">
            <a-breadcrumb-item>
              <router-link :to="{name:'HelpCenter',query:{openKeys:'1'}}">新手入门</router-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item>
              <router-link :to="{name:'HelpCenter',query:{openKeys:'3'}}">帮助中心</router-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item>
              <router-link :to="{name:'HelpCenter',query:{openKeys:'4',itemKeys:'3'}}">免责声明</router-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item>
              <a @click="aBtn('OnlineComplaint','1')">在线投诉</a>
            </a-breadcrumb-item>
            <a-breadcrumb-item>
              <a @click="aBtn('OpinionAdvice','2')">意见建议</a>
            </a-breadcrumb-item>
          </a-breadcrumb>
        </a-col>

      </a-row>
      <a-row :gutter="16" type="flex" justify="center" align="top">
        <a-col class="bot-sp">
          <span>指导单位：厦门市市场监督管理局（知识产权局）&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;版权所有：厦门知识产权投资有限公司  闽ICP备16018877号-3</span>
        </a-col>
      </a-row>
    </div>
  </div>

</template>

<script>
  import FriendshipLink from './FriendshipLink'
  import { judgeState } from '@/utils/util'

  export default {
    name: 'portalFooter',
    components: { FriendshipLink },
    inject: ['headLogin'],
    methods: {
      aBtn(key, type) {
        if (!judgeState()) {
          this.$message.warning('请先进行登录！')
          this.headLogin('goto', { name: key, params: { type: type } })
        } else {
          this.$router.push({ name: key, params: { type: type } })
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../main";

  #doorFooter {
    .main-css();
    text-align: center;
    font-size: 14px;
    .ant-row {
      margin: 0 !important;
    }
    .left-col {
      margin-top: 40px;
      border-right: 1px solid #282a34;
    }
    .ant-divider {
      background-color: #282a34;
      margin: 40px 0 5px;
    }
    background-color: #10121d;
    color: #FFFFFF;
    h2 {
      font-size: 16px;
      font-weight: normal;
      text-align: left;
      margin-bottom: 0;
      color: #ffffff;
    }
    ul {
      padding: 0;
      text-align: left;
      margin: 0;
      li {
        display: block;
        padding-top: 20px;
        padding-left: 5px;
        a {
          color: #fff;
          text-decoration: none;
        }
      }
    }
    .pho-psi {
      img {

      }
      span {
        font-size: 16px;
        position: relative;
        left: 5px;
        top: 40px;
      }
      p {
        font-size: 16px;
        font-weight: bold;
        margin: 0;
        text-align: left;
      }
    }
    .ant-breadcrumb {
      line-height: 20px !important;
      margin: auto;
      display: inline-block;
    }
    .lastFoot {
      margin-bottom: 5px;
      margin-top: 10px;
      a {
        font-size: 12px;
      }
    }
    .bot-sp {
      display: inline-block;
      margin-bottom: 15px;
      color: #8b8b8e;
      span {
        font-size: 10px;
      }
    }

  }

  #doorFooter /deep/ span.ant-breadcrumb-separator {
    color: #8b8b8e;
  }

  #doorFooter .ant-breadcrumb-link a,
  #doorFooter .ant-breadcrumb-link {
    color: #8b8b8e;
    font-weight: 500 !important;
    cursor: pointer !important;
  }

</style>