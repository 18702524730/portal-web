<template>
  <div></div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'Listener',
    mounted() {
      const that = this
      window.addEventListener('message', function(data) {
        that.loadingASetting(data)
      })
    },
    beforeDestroy() {
      // 组件销毁前需要解绑事件。否则会出现重复触发事件的问题
      const that = this
      window.removeEventListener('message', function(data) {
        that.loadingASetting(data)
      })
    },
    methods: {
      ...mapActions(['LoginByToken', 'Logout']),
      loadingASetting(e) {
        if (e.origin !== window._CONFIG['userCenterURL']) {
          return
        }
        if (e.data.token) {
          // 登录
          this.LoginByToken({ token: e.data.token }).then((res) => {
            console.info(res)
            console.info('触发他哥哥的')
          }).catch(err => {
            this.$message.error({
              title: '错误',
              description: err.message
            })
          })
        } else if (e.data.token === false) {
          // 退出登录
          this.Logout({}).then(() => {
          }).catch(err => {
            this.$message.error({
              title: '错误',
              description: err.message
            })
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>