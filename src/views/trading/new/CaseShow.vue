<template>
  <div id="caseShow">
    <div class="container">
      <a-card class="my-search">
        <a-form-model layout="inline" :model="form" @submit="handleSubmit" @submit.native.prevent>
          <a-form-model-item label="案例名称">
            <a-input v-model="form.title" placeholder="请输入案例名称">
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
                <a-row type="flex" justify="space-between" align="middle">
                  <a-col :span="20">
                    <span class="my-title">{{ item.orderType | tagName }}{{ item.transactionContent }}</span>
                  </a-col>
                  <a-col :span="4">
                    <span class="my-time">售出时间：{{ item.orderTime | changeDate}}</span>
                  </a-col>
                </a-row>
              </div>
              <div slot="avatar" class="my-img-div">
                <img :src="getImgNewView(item.ipInfo.imgUrl)" alt="案例展示">
              </div>

              <div slot="description" class="description">
                <div v-if="item.orderType === '2'">
                  <a-row :gutter="16">
                    <a-col :span="6" class="my-col">
                      <span>所属行业：</span>
                      <span
                        style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis; -webkit-box-orient: vertical;-webkit-line-clamp: 1;"><a-tooltip
                        placement="top" :title="item.ipInfo.belongIndustryName" style="white-space: inherit">{{ item.ipInfo.belongIndustryName | ellipsis}}</a-tooltip></span>
                    </a-col>
                    <a-col :span="6" class="my-col">
                      <span>意向运营方式：</span>
                      <span
                        style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis; -webkit-box-orient: vertical;-webkit-line-clamp: 1;"><a-tooltip
                        placement="top" :title="item.ipInfo.intendedOperationModeName" style="white-space: inherit">{{ item.ipInfo.intendedOperationModeName | ellipsis}}</a-tooltip></span>
                    </a-col>

                  </a-row>
                  <a-row :gutter="16">
                    <a-col :span="6" class="my-col">
                      <span>项目所在地：</span>
                      <span>{{ item.ipInfo.madeAreaCodeName |changeData | ellipsis}}</span>
                    </a-col>
                  </a-row>
                </div>

                <div v-else-if="item.orderType === '3'">
                  <a-row :gutter="16">
                    <a-col :span="6" class="my-col">
                      <span>技术领域：</span><span>{{ item.ipInfo.technicalFieldName  | ellipsis}}</span>
                    </a-col>
                    <a-col :span="6" class="my-col">
                      <span>所属行业：</span>
                      <span
                        style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis; -webkit-box-orient: vertical;-webkit-line-clamp: 1;"><a-tooltip
                        placement="top" :title="item.ipInfo.belongIndustryName" style="white-space: inherit">{{ item.ipInfo.belongIndustryName | ellipsis}}</a-tooltip></span>
                    </a-col>
                    <a-col :span="6" class="my-col">
                      <span>合作区域：</span><span>{{ item.ipInfo.cooperationAreaName  | ellipsis}}</span>
                    </a-col>
                  </a-row>
                  <a-row :gutter="16">
                    <a-col :span="6" class="my-col">
                      <span>专利类型：</span><span>{{ item.ipInfo.patentTypeName  | ellipsis}}</span>
                    </a-col>
                    <a-col :span="6" class="my-col">
                      <span>意向运营方式：</span><span>{{ item.ipInfo.intendedOperationModeName  | ellipsis}}</span>
                    </a-col>
                  </a-row>
                </div>

                <div v-else>
                  <a-row :gutter="16">
                    <a-col :span="6" class="my-col">
                      <span>商标类别：</span>
                      <span
                        style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis; -webkit-box-orient: vertical;-webkit-line-clamp: 1;"><a-tooltip
                        placement="top" :title="item.ipInfo.trademarkTypeName" style="white-space: inherit">{{ item.ipInfo.trademarkTypeName | ellipsis}}</a-tooltip></span>
                    </a-col>
                    <a-col :span="6" class="my-col">
                      <span>行业需求：</span>
                      <span
                        style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis; -webkit-box-orient: vertical;-webkit-line-clamp: 1;"><a-tooltip
                        placement="top" :title="item.ipInfo.belongIndustryName" style="white-space: inherit">{{ item.ipInfo.belongIndustryName | ellipsis}}</a-tooltip></span>
                    </a-col>
                  </a-row>
                  <a-row :gutter="16">
                    <a-col :span="6" class="my-col">
                      <span>组合类型：</span><span>{{ item.ipInfo.combinationCategoryName | ellipsis }}</span>
                    </a-col>
                  </a-row>
                </div>
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
    name: 'CaseShow',
    data() {
      return {
        data: [],
        url: '/zscq/portal/ipManage/caseShowList',
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
        this.$router.push({ name: 'CaseShowDetails', query: { itemId: item.id, keyRoute: 'CaseShow' } })
      },
      handleSubmit() {
        this.ipagination.current = 1
        Object.assign(this.formParam, this.form)
        this.loadData(this.handleParam(this.formParam))
      },
      getImgNewView(text) {
        return getImgNewView(text)
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
      tagName(value) {
        let name = ''
        if (value) {
          switch (value) {
            case '2':
              name = '【项目】'
              break
            case '3':
              name = '【专利】'
              break
            case '4':
              name = '【商标】'
              break
            default:
          }
        }
        return name
      },
      changeData(value) {
        if (value) {
          const arr = value.split('/')
          return arr[arr.length - 1]
        }
        return value
      },
      ellipsis(value) {
        if (value === undefined || value === null) {
          return '无'
        }
        if (!value) {
          return '无'
        }
        if (judgmentBrowser()) {
          return value
        }
        if (value.length > 12) {
          return value.substring(0, 10) + '...'
        }
        return value
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../components/main";

  #caseShow {
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
        width: 115px;
        height: 70px;
        img {
          padding: 0 5px;
          width: 100%;
          height: 100%;
        }
      }
      /deep/ .ant-list-item-meta-content {
        padding-right: 20px;
        font-family: '微软雅黑 Bold', '微软雅黑 Regular', '微软雅黑';
        color: #666666;
        .my-title {
          color: #555555;
          font-size: 18px;
        }
        .my-time {
          color: #797979;
          font-size: 14px;
        }
      }
      .description {
        padding-top: 10px;
        .my-col {
          display: flex;
          span:nth-child(1) {
            white-space: nowrap;
          }
        }
      }
    }
    /deep/ .ant-list-pagination {
      padding: 10px;
    }
  }
</style>