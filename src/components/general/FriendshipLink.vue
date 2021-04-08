<template>
  <div id="friendShipLink">
    <div class="container">
      <h2 style="text-align: left;margin-top: 1em;color: #001833">友情链接</h2>
      <a-row :gutter="12">
        <a-col :span="6">
          <a-card hoverable :bordered="false" size="small" @click="toLink(url[0])">
            <div style="height: 87px">
              <img :src="img[0]" style="height: 100%;width: 100%;" :onerror="defaultImg"/>
            </div>
          </a-card>
        </a-col>

        <a-col :span="6">
          <a-card hoverable :bordered="false" size="small" @click="toLink(url[1])">
            <div style="height: 87px">
              <img :src="img[1]" style="height: 100%;width: 100%;" :onerror="defaultImg"/>
            </div>
          </a-card>
        </a-col>

        <a-col :span="6">
          <a-card hoverable :bordered="false" size="small" @click="toLink(url[2])">
            <div style="height: 87px">
              <img :src="img[2]" style="height: 100%;width: 100%;" :onerror="defaultImg"/>
            </div>
          </a-card>
        </a-col>

        <a-col :span="6">
          <a-card hoverable :bordered="false" size="small" @click="toLink(url[3])">
            <div style="height: 87px">
              <img :src="img[3]" style="height: 100%;width: 100%;" :onerror="defaultImg"/>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FriendshipLink',
    data() {
      return {
        defaultImg: 'this.src=\'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png\'',
        img: [
          require('../../assets/images/harf5.png'),
          require('../../assets/images/harf3.png'),
          require('../../assets/images/harf2.png'),
          require('../../assets/images/harf1.png')
        ],
        url: [
          'http://ggfw.cnipa.gov.cn:8010/PatentCMS_Center/',
          'http://www.sipop.cn/',
          'http://www.sipc26.com/',
          'http://www.xmistec.com/'
        ]
      }
    },
    methods: {
      toLink(url) {
        window.open(url, '_blank')
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../main";

  #friendShipLink {
    .main-css();
    text-align: center;
    color: #333333;
    margin-bottom: 20px;
    /deep/ .ant-card-body {
      padding: 0;
    }
    .boder-class {
      border-right: 2px solid #e8e8e8;
    }
  }


</style>