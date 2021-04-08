<template>
  <div id="projectZone">
    <div class="container">
      <a-card class="my-search">
        <a-form-model layout="inline" :model="form" @submit="handleSubmit" @submit.native.prevent>
          <a-form-model-item label="专区名称">
            <a-input v-model="form.title" placeholder="请输入专区名称">
            </a-input>
          </a-form-model-item>
          <a-form-model-item label="发布时间">
            <a-range-picker @change="onChange"/>
          </a-form-model-item>
          <a-form-model-item>
            <a-button
              type="primary"
              html-type="submit"
            >
              搜索
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </a-card>

      <a-card class="my-list">
        <a-list item-layout="horizontal" :data-source="data" :loading="loading" :pagination="ipagination">
          <a-list-item slot="renderItem" slot-scope="item, index" @click="onClick(item)">
            <a-list-item-meta>
              <div slot="title">
                <h2
                  style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis; -webkit-box-orient: vertical;-webkit-line-clamp: 1;">
                  {{item.title | ellipsis(40)}}</h2>
              </div>
              <div slot="avatar" class="my-img-div">
                <img :src="getImgNewView(item.articleIcons)" alt="项目专区">
              </div>

              <div slot="description" class="description">
                <p class="main-content"
                   style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis; -webkit-box-orient: vertical;-webkit-line-clamp: 3;">
                  {{ item.content | filterData | ellipsis(200)}}
                </p>
                <p class="content-time">
                  发布时间：{{item.releaseDate | changeDate}}
                </p>
              </div>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-card>
    </div>
  </div>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'
  import { filterObj, cloneObject } from '@/utils/util'
  import { getImgNewView, judgmentBrowser } from '@/utils/role'

  export default {
    name: 'ProjectZone',
    data() {
      return {
        data: [],
        url: '/zscq/portal/ipManage/projectLibraryList',
        ipagination: {
          current: 1,
          pageSize: 10,
          showQuickJumper: true,
          total: 0,
          onChange: page => {
            this.handleTableChange(page)
          }
        },
        loading: {
          delay: 500,
          spinning: false
        },
        formParam: {
          releaseDate_begin: '',
          releaseDate_end: '',
          title: ''
        },
        form: {
          releaseDate_begin: '',
          releaseDate_end: '',
          title: ''
        }
      }
    },
    created() {
      this.handleSubmit()
    },
    methods: {
      onClick(item) {
        window.open(item.detailPageUrl)
      },
      getImgNewView(text) {
        return getImgNewView(text)
      },
      handleSubmit() {
        this.ipagination.current = 1
        Object.assign(this.formParam, this.form)
        this.loadData(this.handleParam(this.formParam))
      },
      onChange(date, dateString) {
        if (dateString && dateString.length > 0) {
          this.form.releaseDate_begin = dateString[0]
          this.form.releaseDate_end = dateString[1]
        }
      },
      async loadData(param) {
        this.loading.spinning = true
        const res = await getActionUpdateKeyword(this.url, param)
        this.loading.spinning = false
        if (res.success) {
          this.data = res.result.records
          this.ipagination.total = res.result.total
        } else {
          this.$message.error('请求失败')
        }
      },
      handleTableChange(page) {
        this.ipagination.current = page
        const param = this.handleParam(this.formParam)
        this.loadData(param)
      },
      handleParam(param) {
        const that = this
        that.formParam = param

        let newParam = cloneObject(param)
        newParam.pageNo = that.ipagination.current
        newParam.pageSize = that.ipagination.pageSize

        newParam = filterObj(newParam)

        return newParam
      }
    },
    filters: {
      filterData(data) {
        if (!data) {
          return '无'
        }
        return data
      },
      ellipsis(value, length) {
        if (value === undefined || value === null) {
          return '无'
        }
        if (!value) {
          return '无'
        }
        if (judgmentBrowser()) {
          return value
        }
        if (value.length > length) {
          return value.substring(0, length) + '...'
        }
        return value
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../components/main";

  #projectZone {
    .main-css();
    background-color: @main-bg-color;
    color: #333333;
    overflow: hidden;
    .my-search {
      margin-bottom: 10px;
    }
    .my-list {
      margin-bottom: 10px;
      /deep/ .ant-card-body {
        padding: 0;
      }
      .my-img-div {
        width: 256px;
        height: 160px;
        img {
          padding: 0 5px;
          width: 100%;
          height: 100%;
        }
      }
      .description {
        position: relative;
        height: 120px;
        p {
          margin-bottom: 0;
        }
      }
      .ant-list-item-meta {
        cursor: pointer;
      }
      /deep/ .ant-list-item-meta-content {
        padding: 10px 20px 0 0;
        font-family: '微软雅黑 Bold', '微软雅黑 Regular', '微软雅黑';
        color: #666666;
        h2 {
          font-weight: 700;
          font-size: 20px;
        }
        span {
          font-weight: 400;
          font-size: 14px;
        }
        .main-content {
          margin-bottom: 10px;
        }
        .content-time {
          color: #aaaaaa;
          position: absolute;
          bottom: 0;
        }
      }
    }
    /deep/ .ant-list-pagination {
      padding: 10px;
    }
  }
</style>