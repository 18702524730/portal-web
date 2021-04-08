<template>
<div class="sebecomWidth">
      <div class="ordinarypsearch">
          <div class="logobox">
              <div class="logo">
                  <img src="@assets/img/ws.png" alt="">
              </div>
              <div class="textbox">
                    <p>法律文书检索</p>
              </div>
          </div>
        <div class="search-boxs">
            <div class="fl">
                <a-select v-model="type">
                    <a-select-option key="复审无效">复审无效</a-select-option>
                    <a-select-option key="裁判文书">裁判文书</a-select-option>
                </a-select>
            </div>
            
            <div class="left-search fl">
                
                <a-input-search
                    placeholder="请输入要查询的专利申请号，示例：200930172778"
                    enter-button
                    @pressEnter="entersearch"
                    v-model="cont"
                    @search="onSearch"
                    />
            </div>
        </div>
      </div>
    </div>  
</template>

<script>
import { judgeState } from '@/utils/util'
export default {
    inject: ['loginNotReload', 'headLogin'],
    data() {
        return {
            type: '复审无效',
            cont: ''
        }
    },
    mounted() {
    },
    methods: {
        entersearch(e) {
            if (!this.cont) {
                this.$messagesebe.warning('请输入要查询的专利申请号')
                return
            }
            if (!judgeState()) {
                const obj = { name: 'LawSearchList' }
                const obk = {
                    'query': {
                        applicationDocNum: this.cont,
                        type: this.type === "复审无效" ? 2 : 1
                    }
                }
                this.headLogin('goto', obj,obk)
                return
            }
            const re = {}
            re.applicationDocNum = this.cont
            if (this.type === "复审无效") {
                re.type = '2'
            }
            if (this.type === '裁判文书') {
                re.type = '1'
            }
            this.$router.push({ name: 'LawSearchList', query: re })
        },
        onSearch(val) {
            if (!val) {
                this.$messagesebe.warning('请输入要查询的专利申请号')
                return
            }
            if (!judgeState()) {
                const obj = { name: 'LawSearchList' }
                const obk = {
                    'query': {
                        applicationDocNum: val,
                        type: this.type === "复审无效" ? 2 : 1
                    }
                }
                this.headLogin('goto', obj,obk)
                return
            }
            const re = {}
            re.applicationDocNum = val
            if (this.type === "复审无效") {
                re.type = '2'
            }
            if (this.type === '裁判文书') {
                re.type = '1'
            }
            this.$router.push({ name: 'LawSearchList', query: re })
        }
    }
}
</script>

<style lang ='less'>
.sebecomWidth {
    width: 1200px;
    margin: 0 auto;
    .fl {
        float: left;
    }
    .ordinarypsearch {
        padding: 120px 0 120px;
        min-height: 500px;
        background-color: #fff; 
        .logobox {
            width: 240px;
            margin: 0 auto 100px;
            text-align: center;
            p {
                font-size: 20px;
                color: #001833;
                /* text-align: center; */
                line-height: 26px;
                font-weight: 600;
            }
            .textbox {
                float: left;
                padding-left: 15px;
                line-height: 34px;
                font-size: 20px;
                font-weight: bold;
                color: #000
            }
        }
        .logo {
            float: left;
            width: 34px;
            height: 34px;
            >img{
                display: block;
                width: 100%;
                height: 100%;
            }
        }
    }
    .search-boxs {
        width:700px;
        height: 40px;
        margin: 0 auto;
        .senior {
            height: 32px;
            margin: 0;
            line-height: 32px;
            color: #1890ff;
            cursor: pointer;
            font-size: 16px;
        }
    }
    .left-search {
        width: 600px;
    }
}

</style>