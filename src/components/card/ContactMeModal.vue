<template>
  <a-modal
    :title="title"
    :width="width"
    :visible="visible"
    :maskCosable="false"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <div style="padding-left: 20px">
        <h1>
          <a-tooltip placement="right" :title="org.name">{{org.name | ellipsis}}</a-tooltip>
        </h1>
        <table>
          <tr>
            <td style="width: 16%">联系人:</td>
            <td><span>{{org.contacts}}</span></td>
          </tr>
          <tr>
            <td>联系电话:</td>
            <td>{{org.phone}}</td>
          </tr>
          <tr>
            <td>联系地址:</td>
            <td>{{org.address}}</td>
          </tr>
          <tr v-if="isPostCode && org.postcode">
            <td>邮编:</td>
            <td>{{org.postcode}}</td>
          </tr>
        </table>
      </div>
    </a-spin>
  </a-modal>

</template>

<script>
  import { getAction } from '@/api/manage'
  import { mapGetters } from 'vuex'

  export default {
    name: 'ContactMeModal',
    components: {},
    data() {
      return {
        title: '操作',
        width: 600,
        visible: false,
        orgType: '',
        org: {},
        confirmLoading: false,
        url: {
          orgAgencyUrl: '/org/orgAgency/getOrgAgencyById',
          orgFinanceUrl: '/org/orgFinance/getOrgFinanceById',
          orgEnterprise: '/org/orgEnterprise/queryById',
          orgSelectType: '/org/orgView/getDataByOrgId',
          orgPerson: '/sys/user/queryById',
          orgGarden: '/org/orgGarden/queryById',
          university: '/org/orgUniversity/queryById',
          getOrgId: '/sys/user/getUserIdByOrgId'
        },
        isPostCode: true
      }
    },
    created() {

    },
    filters: {
      ellipsis() {

      }
    },
    methods: {
      ...mapGetters(['userInfo']),
      async edit(orgId, userId, needPopup = false) {

        const res = await getAction(this.url.orgSelectType, { orgId: orgId })
        let orgType = ''
        if (res.success) {
          if (res.result && res.result.auditStatus === '3') {
            orgType = res.result.orgType
            if (!needPopup) {
              const tRes = await getAction(this.url.getOrgId, { orgId: orgId })
              if (tRes.success) {
                orgId = tRes.message
              } else {
                this.$message.error(tRes.message)
                return false
              }
            }
          } else {
            orgType = 'person'
            orgId = userId
          }
        }
        if (!needPopup) {
          const user = this.userInfo()
          let avatar = '/static/common/images/kefu/2.png'
          if (window._CONFIG['prodEnv']) {
            avatar = '/chat/static/common/images/kefu/2.png'
          }
          if (user.avatar) {
            avatar = window._CONFIG['imgDomainURL'] + '/' + user.avatar
          }
          console.info(orgType)
          // const date = new Date().getTime()
          const path = window._CONFIG['serviceUrl'] + orgId + '/' + orgId + '?id=' + user.id + '&name=' + user.realname + '&avatar=' + avatar
          window.open(path)
        } else {
          let url = ''
          switch (orgType) {
            case 'finance':
              url = this.url.orgFinanceUrl
              this.isPostCode = false
              break
            case 'agency':
              url = this.url.orgAgencyUrl
              this.isPostCode = false
              break
            case 'enterprise':
              url = this.url.orgEnterprise
              break
            case 'garden':
              url = this.url.orgGarden
              break
            case 'university':
              url = this.url.university
              break
            default:
              url = this.url.orgPerson
              break
          }
          getAction(url, { id: orgId }).then((res) => {
            this.org = res.result
            this.visible = true
            if (orgType === 'person') {
              this.org.contacts = this.org.realname
              this.org.address = this.org.addr
            }
          })
        }
      },
      close() {
        this.$emit('close')
        this.visible = false
      },
      handleOk() {
        const that = this
        that.close()
      },
      handleCancel() {
        this.close()
      }
    }
  }
</script>
<style lang="less" scoped>
  table {
    tr {
      line-height: 30px;
    }
  }
</style>