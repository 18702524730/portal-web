<template>
  <div id="professorCard">
    <a-card hoverable :bordered="true" @click="cardBtn(item)">
      <a-row class="head-row">
        <div class="img-div">
          <a-avatar
            alt="无图片"
            :src="getImgNewView(item.imgUrl)"
            style="height: 100%;width: 100%;"
            :onerror="defaultImg"
          />
        </div>
        <div class="head-title">
          <h3>
            <span class="span-data" style="-webkit-box-orient: vertical;-webkit-line-clamp: 1;">
              <a-tooltip :title="item.name" >
                {{item.name}}
              </a-tooltip>
            </span>
          </h3>
          <p>行业资深{{item.workingYearsStr}}年</p>
          <a-divider></a-divider>
        </div>
      </a-row>
      <a-row class="content-row">
        <a-row class="content-p">
          <span class="span-data" v-if="item.selfDescription" style="-webkit-box-orient: vertical;">
            <a-tooltip :title="item.selfDescription" placement="right">
                {{item.selfDescription}}
            </a-tooltip>
          </span>
          <p v-else class="my-else">
            无
          </p>
        </a-row>
        <p class="place-p">
          <a-icon type="environment" theme="twoTone"/>
          {{item.cityName}}
        </p>
      </a-row>
    </a-card>
  </div>
</template>

<script>
  import { getImgNewView } from '@/utils/role'
  import { judgeState } from '@/utils/util'

  export default {
    name: 'ProfessorCard',
    props: {
      item: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    inject: ['headLogin'],
    data() {
      return {
        defaultImg: 'https://img.yzcdn.cn/vant/cat.jpeg',
        loginBtn: false
      }
    },
    methods: {
      cardBtn(item) {
        if (judgeState()) {
          this.$router.push({ name: 'ProfessorDetails', query: { itemId: item.id, keyRoute: 'ProfessorBank' } })
        } else {
          this.$message.warning('请先进行登录！')
          this.headLogin()
        }
      },
      getImgNewView(text) {
        return getImgNewView(text)
      },
      getImgView(text) {
        if (text === null) {
          text = this.defaultIcon
          return text
        }
        if (text && text.indexOf(',') > 0) {
          text = text.substring(0, text.indexOf(','))
        }
        return window._CONFIG['imgDomainURL'] + '/' + text
      }
    },
    filters: {}
  }
</script>

<style scoped lang="less">
  #professorCard {
    .head-row {
      .img-div {
        height: 150px;
        width: 150px;
        margin: 22px auto 19px;
      }
      .head-title {
        text-align: center;
      }
    }
    p {
      margin-bottom: 0;
    }
    .span-data {
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      /* autoprefixer: off*/
      -webkit-box-orient: vertical;
      /* autoprefixer: on*/
      -webkit-line-clamp: 4;
    }
    .content-row {
      .content-p {
        height: 72px;
        color: #aaaaaa;
        font-size: 12px;
      }

      .place-p {
        margin-top: 1em;
      }
    }
    .ant-divider-horizontal {
      margin: 5px 0 12px;
    }
    /deep/ .ant-card-body {
      padding: 12px;
    }

    .my-else{
      text-align: center;
      line-height: 72px;
    }
  }
</style>