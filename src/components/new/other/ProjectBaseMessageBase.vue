<template>
  <div id="projectBaseMessageBase">
    <a-spin size="large" :spinning="spinning">
      <a-form-model :model="portalProject" :label-col="labelCol" :wrapper-col="allWrapperCol" :rules="rules"
                    ref="ruleForm">
        <a-row class="main-h3 my-row">
          <h3>项目基本信息</h3>
        </a-row>

        <a-form-model-item label="项目名称" :wrapper-col="firstWrapperCol" prop="projectName">
          <a-input placeholder="请输入项目名称" v-model="portalProject.projectName" id="projectName"></a-input>
        </a-form-model-item>

        <a-form-model-item label="所属行业" :wrapper-col="firstWrapperCol" prop="belongIndustryArr">
          <a-cascader :options="belongIndustryOptions" placeholder="请选择所属行业" v-model="portalProject.belongIndustryArr"
                      id="belongIndustryArr"/>
        </a-form-model-item>

        <a-form-model-item label="项目关键字" :wrapper-col="wrapperCol" prop="projectKeyword">
          <a-row>
            <a-col :span="12">
              <a-input placeholder="请输入项目关键字，多个关键字用中文逗号隔开" v-model="portalProject.projectKeyword"
                       id="projectKeyword"></a-input>
            </a-col>
            <a-col :span="12">
              <span class="hint-span">提示：字数限制在40字以内</span>
            </a-col>
          </a-row>
        </a-form-model-item>

        <a-form-model-item label="项目展示截止日期" :wrapper-col="wrapperCol" prop="deadlineDate">
          <a-row>
            <a-col :span="12">
              <a-date-picker placeholder="请选择项目展示截止日期" style="width: 100%" v-model="portalProject.deadlineDate"
                             id="deadlineDate">
                <template slot="dateRender" slot-scope="current, today">
                  <div class="ant-calendar-date" :style="getCurrentStyle(current, today)">
                    {{ current.date() }}
                  </div>
                </template>
              </a-date-picker>
            </a-col>
            <a-col :span="12">
              <span class="hint-span">提示：项目展示期是指项目在平台的展示期限，到期后自动下架</span>
            </a-col>
          </a-row>
        </a-form-model-item>

        <a-form-model-item label="项目所在地" :wrapper-col="firstWrapperCol" prop="madeAreaCodeArr">
          <a-cascader :options="areaOptions" placeholder="请选择项目所在地" v-model="portalProject.madeAreaCodeArr"
                      id="madeAreaCodeArr"/>
        </a-form-model-item>

        <a-row class="main-h3 my-row">
          <h3>项目内容</h3>
        </a-row>

        <div class="table-content">
          <a-row class="my-row">
            <a-row class="main-h4">
              <h4>
                <span><b>* </b>专利</span>
              </h4>
            </a-row>
            <a-form-model-item prop="portalSupplyProjectPatents" :wrapper-col="allTWrapperCol">
              <a-row>
                <project-patent-table :have-oper="haveOper" @func="openModal" ref="patentTable"
                                      :data.sync="portalProject.portalSupplyProjectPatents"
                                      id="portalSupplyProjectPatents"></project-patent-table>
              </a-row>
            </a-form-model-item>
          </a-row>

          <a-row class="my-row">
            <a-row class="main-h4">
              <h4>
                <span>商标</span>
              </h4>
            </a-row>
            <a-row>
              <project-brand-table :have-oper="haveOper" @func="openModal" ref="brandTable"
                                   :data.sync="portalProject.portalSupplyProjectTrademarks"></project-brand-table>
            </a-row>
          </a-row>

          <a-row class="my-row">
            <a-row class="main-h4">
              <h4>
                <span>软件著作</span>
              </h4>
            </a-row>
            <a-row>
              <project-software-table :have-oper="haveOper" @func="openModal"
                                      ref="softwareTable"
                                      :data.sync="portalProject.portalSupplyProjectSoftwares"></project-software-table>
            </a-row>
          </a-row>

          <a-row class="my-row">
            <a-row class="main-h4">
              <h4>
                <span>集成电路</span>
              </h4>
            </a-row>
            <a-row>
              <project-integration-table :have-oper="haveOper" @func="openModal"
                                         ref="integrationTable"
                                         :data.sync="portalProject.portalSupplyProjectJcdls"></project-integration-table>
            </a-row>
          </a-row>

          <a-row class="my-row">
            <a-row class="main-h4">
              <h4>
                <span>植物新品种</span>
              </h4>
            </a-row>
            <a-row>
              <project-plant-table :have-oper="haveOper" @func="openModal" ref="plantTable"
                                   :data.sync="portalProject.portalSupplyProjectZwxpzs"></project-plant-table>
            </a-row>
          </a-row>
        </div>

        <a-form-model-item label="非专利技术" prop="noPatentTechnology">
          <a-input type="textarea" placeholder="最多500个字符" v-model="portalProject.noPatentTechnology"></a-input>
        </a-form-model-item>

        <a-form-model-item label="技术团队" prop="technologyTeam">
          <j-dict-select-tag placeholder="请选择技术团队" type="radio" dict-code="technology_team"
                             v-model="portalProject.technologyTeam"></j-dict-select-tag>
        </a-form-model-item>

        <a-form-model-item label="配套资产" prop="supportingAssets">
          <a-input placeholder="最多50个字符" v-model="portalProject.supportingAssets"></a-input>
        </a-form-model-item>

        <a-row class="main-h3 my-row">
          <h3 id="transactionPrice">意向运营方式<span>（至少填写一种意向运营方式）</span></h3>
        </a-row>
        <div class="table-content">
          <a-row class="my-row">
            <a-row class="main-h4">
              <h4>
                <span>转让</span>
              </h4>
            </a-row>
            <a-row>
              <a-form-model-item label="转让金额" :wrapper-col="firstWrapperCol" prop="zrTransactionPriceAndMoney">
                <a-input v-model="portalProject.zrTransactionPriceAndMoney" type="hidden"></a-input>
                <radio-and-input id="zrTransactionPriceAndMoney" :radioValue.sync="portalProject.zrTransactionPrice"
                                 :amount.sync="portalProject.zrMoney"
                                 :value-amount.sync="portalProject.zrTransactionPriceAndMoney"></radio-and-input>
              </a-form-model-item>
            </a-row>
          </a-row>

          <a-row class="my-row">
            <a-row class="main-h4">
              <h4>
                <span>许可</span>
              </h4>
            </a-row>
            <a-row>
              <a-form-model-item label="独占许可" :wrapper-col="firstWrapperCol" prop="dzxkTransactionPriceAndMoney">
                <a-input v-model="portalProject.dzxkTransactionPriceAndMoney" type="hidden"></a-input>
                <radio-and-input id="dzxkTransactionPriceAndMoney" :radioValue.sync="portalProject.dzxkTransactionPrice"
                                 :amount.sync="portalProject.dzxkMoney"
                                 :value-amount.sync="portalProject.dzxkTransactionPriceAndMoney"></radio-and-input>
              </a-form-model-item>
              <a-form-model-item label="排他许可" :wrapper-col="firstWrapperCol" prop="ptxkTransactionPriceAndMoney">
                <a-input v-model="portalProject.ptxkTransactionPriceAndMoney" type="hidden"></a-input>
                <radio-and-input id="ptxkTransactionPriceAndMoney" :radioValue.sync="portalProject.ptxkTransactionPrice"
                                 :amount.sync="portalProject.ptxkMoney"
                                 :value-amount.sync="portalProject.ptxkTransactionPriceAndMoney"></radio-and-input>
              </a-form-model-item>
              <a-form-model-item label="普通许可" :wrapper-col="firstWrapperCol" prop="putxkTransactionPriceAndMoney">
                <a-input v-model="portalProject.putxkTransactionPriceAndMoney" type="hidden"></a-input>
                <radio-and-input id="putxkTransactionPriceAndMoney"
                                 :radioValue.sync="portalProject.putxkTransactionPrice"
                                 :amount.sync="portalProject.putxkMoney"
                                 :value-amount.sync="portalProject.putxkTransactionPriceAndMoney"></radio-and-input>
              </a-form-model-item>
            </a-row>
          </a-row>

          <a-row class="my-row">
            <a-row class="main-h4">
              <h4>
                <span>股权融资</span>
              </h4>
            </a-row>
            <a-row>
              <a-form-model-item label="股权融资" :wrapper-col="firstWrapperCol" prop="gqrzTransactionPriceAndMoney">
                <a-input v-model="portalProject.gqrzTransactionPriceAndMoney" type="hidden"></a-input>
                <radio-and-input id="gqrzTransactionPriceAndMoney" :radioValue.sync="portalProject.gqrzTransactionPrice"
                                 :amount.sync="portalProject.gqrzMoney"
                                 :value-amount.sync="portalProject.gqrzTransactionPriceAndMoney"></radio-and-input>
              </a-form-model-item>
            </a-row>
          </a-row>

          <a-row class="my-row">
            <a-row class="main-h4">
              <h4>
                <span>质押融资</span>
              </h4>
            </a-row>
            <a-row>
              <a-form-model-item label="质押融资" :wrapper-col="firstWrapperCol" prop="zyrzTransactionPriceAndMoney">
                <a-input v-model="portalProject.zyrzTransactionPriceAndMoney" type="hidden"></a-input>
                <radio-and-input id="zyrzTransactionPriceAndMoney" :radioValue.sync="portalProject.zyrzTransactionPrice"
                                 :amount.sync="portalProject.zyrzMoney"
                                 :value-amount.sync="portalProject.zyrzTransactionPriceAndMoney"></radio-and-input>
              </a-form-model-item>
            </a-row>
          </a-row>
        </div>
      </a-form-model>

      <a-row class="my-btn-div">
        <a-col :span="6">
          <a-button type="primary" @click="saveDraft" class="my-btn-group" :disabled="btnNotCan">
            保存草稿
          </a-button>
        </a-col>
        <a-col :span="6">
          <a-button type="primary" @click="backTop" class="my-btn-group" :disabled="btnNotCan">
            上一步
          </a-button>
        </a-col>
        <a-col :span="6">
          <a-button type="primary" @click="onSubmit" class="my-btn-group" :disabled="btnNotCan">
            下一步
          </a-button>
        </a-col>
        <a-col :span="6" v-if="portalProject.projectType === '3'">
          <a-button class="my-btn-group" @click="changeType">
            转为托管项目>>
          </a-button>
        </a-col>
      </a-row>

      <patent-add-modal ref="patent" @func="addData"></patent-add-modal>
      <brand-add-modal ref="brand" @func="addData"></brand-add-modal>
      <software-add-modal ref="software" @func="addData"></software-add-modal>
      <integration-add-modal ref="integration" @func="addData"></integration-add-modal>
      <plant-add-modal ref="plant" @func="addData"></plant-add-modal>
    </a-spin>
  </div>
</template>

<script>
  import PatentAddModal from '../modal/PatentAddModal'
  import BrandAddModal from '../modal/BrandAddModal'
  import SoftwareAddModal from '../modal/SoftwareAddModal'
  import IntegrationAddModal from '../modal/IntegrationAddModal'
  import PlantAddModal from '../modal/PlantAddModal'
  import JDictSelectTag from '../../general/JDictSelectTag'
  import ProjectPlantTable from '../table/ProjectPlantTable'
  import ProjectIntegrationTable from '../table/ProjectIntegrationTable'
  import ProjectSoftwareTable from '../table/ProjectSoftwareTable'
  import ProjectBrandTable from '../table/ProjectBrandTable'
  import ProjectPatentTable from '../table/ProjectPatentTable'
  import RadioAndInput from '../../general/RadioAndInput'
  import { getActionUpdateKeyword, postAction } from '@/api/manage'

  export default {
    name: 'ProjectBaseMessageBase',
    components: {
      RadioAndInput,
      ProjectPatentTable,
      ProjectBrandTable,
      ProjectSoftwareTable,
      ProjectIntegrationTable,
      ProjectPlantTable,
      JDictSelectTag,
      PlantAddModal,
      IntegrationAddModal,
      SoftwareAddModal,
      BrandAddModal,
      PatentAddModal
    },
    data() {
      const validatePass = (rule, value, callback) => {
        if (value) {
          const arr = value.split('-')
          if (arr.length > 0 && arr[0] === '1' && arr[1] === '') {
            callback(new Error('选择非面议需要填写交易价格'))
          }
          callback()
        } else {
          callback()
        }
      }

      const atLeastOne = (rule, value, callback) => {
        if (value.length === 0) {
          callback(new Error('至少添加一条专利信息'))
        }
        callback()
      }
      return {
        spinning: false,
        btnNotCan: false,
        labelCol: { span: 4 },
        allWrapperCol: { span: 19 },
        wrapperCol: { span: 20 },
        firstWrapperCol: { span: 10 },
        allTWrapperCol: { span: 24 },
        haveOper: true,

        areaOptions: [],
        belongIndustryOptions: [],

        portalProject: {
          projectName: '',
          belongIndustry: '',
          belongIndustryArr: [],
          projectKeyword: '',
          deadlineDate: null,
          madeAreaCode: '',
          madeAreaCodeArr: [],

          portalSupplyProjectPatents: [],
          portalSupplyProjectTrademarks: [],
          portalSupplyProjectSoftwares: [],
          portalSupplyProjectJcdls: [],
          portalSupplyProjectZwxpzs: [],

          noPatentTechnology: '',
          technologyTeam: '',
          supportingAssets: '',

          zrTransactionPrice: '',
          zrMoney: null,
          dzxkTransactionPrice: '',
          dzxkMoney: null,
          ptxkTransactionPrice: '',
          ptxkMoney: null,
          putxkTransactionPrice: '',
          putxkMoney: null,
          gqrzTransactionPrice: '',
          gqrzMoney: null,
          zyrzTransactionPrice: '',
          zyrzMoney: null,

          zrTransactionPriceAndMoney: '',
          dzxkTransactionPriceAndMoney: '',
          ptxkTransactionPriceAndMoney: '',
          putxkTransactionPriceAndMoney: '',
          gqrzTransactionPriceAndMoney: '',
          zyrzTransactionPriceAndMoney: '',

          projectType: this.$route.query.type,
          id: this.$route.query.projectId
        },
        tradingTypeSelect: false,
        rules: {
          projectName: [
            { required: true, max: 40, message: '请输入项目名称,长度在40字以内!' }
          ],
          belongIndustryArr: [
            { required: true, message: '请选择所属行业!' }
          ],
          projectKeyword: [
            { required: true, max: 40, message: '请输入项目关键字,长度在40字以内!' }
          ],
          deadlineDate: [
            { required: true, message: '请选择项目展示截止日期!' }
          ],
          madeAreaCodeArr: [
            { required: true, message: '请选择项目所在地!' }
          ],

          portalSupplyProjectPatents: [
            { validator: atLeastOne, trigger: 'change' }
          ],

          noPatentTechnology: [
            { max: 500, message: '最多500个字符' }
          ],
          technologyTeam: [],
          supportingAssets: [
            { max: 50, message: '最多50个字符' }
          ],

          zrTransactionPriceAndMoney: [
            { validator: validatePass }
          ],
          dzxkTransactionPriceAndMoney: [
            { validator: validatePass }
          ],
          ptxkTransactionPriceAndMoney: [
            { validator: validatePass }
          ],
          putxkTransactionPriceAndMoney: [
            { validator: validatePass }
          ],
          gqrzTransactionPriceAndMoney: [
            { validator: validatePass }
          ],
          zyrzTransactionPriceAndMoney: [
            { validator: validatePass }
          ]
        },
        projectUrl: '/zscq/portal/projectInfolist',
        addDraftUrl: '/project/portalProject/draft',
        checkUrl: '/project/portalProject/projectInfoCheck'
      }
    },
    created() {
      this.loadDatas()
      // 如果有id 可能 是编辑或者草稿
      if (this.$route.query && this.$route.query.projectId) {
        this.loadData()
      }
    },
    methods: {
      addKey(itemArr) {
        for (const i in itemArr) {
          itemArr[i].key = i
        }
      },
      async loadData() {
        this.spinning = true
        const param = { projectId: this.$route.query.projectId }
        const res = await getActionUpdateKeyword(this.projectUrl, param)
        if (res.success) {
          if (!res.result.deadlineDate){
            res.result.deadlineDate = null
          }
          Object.assign(this.portalProject, res.result)
          // 处理数组
          if (this.portalProject.belongIndustry !== undefined && this.portalProject.belongIndustry !== null && this.portalProject.belongIndustry !== '') {
            this.portalProject.belongIndustryArr = this.portalProject.belongIndustry.split(',')
          }

          if (this.portalProject.madeAreaCode !== undefined && this.portalProject.madeAreaCode !== null && this.portalProject.madeAreaCode !== '') {
            this.portalProject.madeAreaCodeArr = this.portalProject.madeAreaCode.split(',')
          }
          // 给原来子对象添加key
          this.addKey(this.portalProject.portalSupplyProjectPatents)
          this.addKey(this.portalProject.portalSupplyProjectTrademarks)
          this.addKey(this.portalProject.portalSupplyProjectSoftwares)
          this.addKey(this.portalProject.portalSupplyProjectJcdls)
          this.addKey(this.portalProject.portalSupplyProjectZwxpzs)
        } else {
          this.$message.error(res.message)
        }
        this.spinning = false
      },
      async submitData(func) {
        this.btnNotCan = true
        // 保存之前先处理数组
        // 处理数组
        if (this.portalProject.belongIndustryArr.length > 0) {
          this.portalProject.belongIndustry = this.portalProject.belongIndustryArr.join(',')
        }

        if (this.portalProject.madeAreaCodeArr.length > 0) {
          this.portalProject.madeAreaCode = this.portalProject.madeAreaCodeArr.join(',')
        }

        let notUpdate = true
        if (this.portalProject.projectStatus === '3') {
          // 这是 审核通过的订单，提交之前先校验
          const pres = await postAction(this.checkUrl, this.portalProject)
          notUpdate = pres.success
        }
        let res = {}
        if (!notUpdate) {
          // 修改了 需要提示
          const that = this
          that.$confirm({
            title: '确认提交项目',
            content: '审核通过项目修改后再提交，需要重新审核',
            onOk: async function() {
              that.spinning = true
              res = await postAction(that.addDraftUrl, that.portalProject)
              if (func) {
                func(res)
              }
              that.spinning = false
            }
          })
        } else {
          // 直接 修改
          console.info(this.portalProject)
          console.info('专利又出现问题了')
          this.spinning = true
          res = await postAction(this.addDraftUrl, this.portalProject)
          if (func) {
            func(res)
          }
          this.spinning = false
        }
        this.btnNotCan = false
      },
      saveDraft() {
        // 保存之前先判断这个是否是审核通过的
        // 保存草稿
        this.submitData()
      },
      backTop() {
        // 上一步，先保存草稿，跳转到上一个页面
        this.submitData(this.jumpBack)
      },
      onSubmit() {
        // 先校验，再保存，最后跳转
        this.$refs.ruleForm.validate((valid, obj) => {
          if (valid) {
            if (!this.tradingTypeSelect) {
              // 没有选择交易方式
              this.$message.warning('至少选择一个意向运营方式')
              document.getElementById('transactionPrice').scrollIntoView()
              return false
            }
            this.submitData(this.jumpTo)
          } else {
            const key = Object.keys(obj)
            if (key && key.length > 0) {
              document.getElementById(key[0]).scrollIntoView()
            }

            return false
          }
        })
      },
      jumpTo() {
        let name = ''
        switch (this.portalProject.projectType) {
          case '1':
            name = 'HighProjectPublishDescribeMessage'
            break
          case '2':
            name = 'EscrowProjectDescribeMessage'
            break
          case '3':
            name = 'SelfHelpProjectDescribeMessage'
            break
          default:
            break
        }
        this.$router.push({
          name: name,
          query: { type: this.portalProject.projectType, projectId: this.portalProject.id }
        })
      },
      jumpBack() {
        let name = ''
        switch (this.portalProject.projectType) {
          case '1':
            name = 'HighProjectPublishForm'
            break
          case '2':
            name = 'EscrowProjectRegisterForm'
            break
          case '3':
            name = 'SelfHelpProjectRegisterForm'
            break
          default:
            break
        }
        this.$router.push({
          name: name,
          query: { type: this.portalProject.projectType, projectId: this.portalProject.id }
        })
      },
      getCurrentStyle(current, today) {
        const style = {}
        if (current.date() === 1) {
          style.border = '1px solid #1890ff'
          style.borderRadius = '50%'
        }
        return style
      },
      loadDatas() {
        getActionUpdateKeyword('/portal/portalLocationCode/getAreaDatas').then((res) => {
          this.areaOptions = res
        })
        getActionUpdateKeyword('/portal/portalIndustryCategory/getIndustryCategorys').then((res) => {
          this.belongIndustryOptions = res
        })
      },
      openModal(type) {
        this.$refs[`${type}`].showModal()
      },
      addData(type, data) {
        this.$refs[`${type + 'Table'}`].addTableData(data)
      },
      jumpChange() {
        this.$router.push({
          name: 'EscrowProjectRegisterForm',
          query: { type: this.portalProject.projectType, projectId: this.portalProject.id }
        })
      },
      changeType(){
        // 转为自助类型，跳转到自助的起始
        this.portalProject.projectType = "2"
        this.submitData(this.jumpChange)
      }
    },
    watch: {
      'portalProject': {
        handler(data) {
          if (data.zrTransactionPrice || data.dzxkTransactionPrice || data.ptxkTransactionPrice || data.putxkTransactionPrice || data.gqrzTransactionPrice || data.zyrzTransactionPrice) {
            this.tradingTypeSelect = true
          } else {
            this.tradingTypeSelect = false
          }
        },
        deep: true,
        immediate: true
      },
      '$route': {
        handler(data) {
        },
        deep: true,
        immediate: true
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../main";

  #projectBaseMessageBase {
    font-size: 16px;
    padding-bottom: 20px;
    .main-h3 {
      h3 {
        font-size: 20px;
        color: #666666;
        span {
          font-size: 12px;
          color: #999999;
        }
      }
      margin-bottom: 20px;
    }
    .main-h4 {
      h4 {
        font-size: 16px;
      }
    }
    /deep/ .ant-form label {
      font-size: 16px;
      color: #666666;
    }
    .hint-span {
      padding-left: 20px;
    }

    .table-content {
      padding: 20px 50px;
      .my-row {
        margin-bottom: 20px;
      }
    }
    .my-btn-div {
      text-align: center;
      .my-btn-group {
        width: 50%;
      }
    }
  }
</style>