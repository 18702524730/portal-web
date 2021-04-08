<template>
    <div class="sebecomWidth">
      <div class="ordinarypsearch">
          <div class="logobox">
              <div class="logo">
                  <img src="@assets/img/sb.png" alt="">
              </div>
              <div class="textbox">
                商标检索
              </div>
          </div>
        <div class="search-box">
            <div class="left-search">
                <a-input-search
                placeholder="请输入要查询的商标名称、申请号、申请人等信息"
                enter-button
                class="shangbiao"
                @pressEnter="entersearch"
                @search="onSearch"
                v-model="cont"
                />
                <div class="shilis">
                    <div class="fl">示例</div>
                    <div class="shiliright">
                        <div>商标名称 银鹭</div>
                        <div>申请号  34674512</div>
                        <div>申请人  厦门银鹭食品集团有限公司 </div>
                    </div>
                </div>
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
            cont: ''
        }
    },
    mounted() {
        this.shilishow()
    },
    methods: {
        shilishow() {
            const sm = document.querySelector('.shangbiao input')
            const sls = document.querySelector('.shilis')
            if (sls) {
                sm.onmouseover = function() {
                    sls.style.display = 'block'
                }
                sm.onmouseout = function() {
                    sls.style.display = 'none'
                }
            }
            
        },
        entersearch(e){
            if (!this.cont) {
                this.$messagesebe.warning('请输入要查询的商标名称、申请号、申请人等信息')
                return
            }
            if (!judgeState()) {
                const obj = { name: 'TrademarkSearchShiBei' }
                const obk = {
                    'query': {
                        q: this.cont
                    }
                }
                this.headLogin('goto', obj,obk)
                return
            }
            const re = {}
                
            re.q = this.cont
            console.log(re)
            this.$router.push({ name: 'TrademarkSearchShiBei', query: re })
        },
        onSearch(val) {
            if (!val) {
                this.$messagesebe.warning('请输入要查询的商标名称、申请号、申请人等信息')
                return
            }
            if (!judgeState()) {
                const obj = { name: 'TrademarkSearchShiBei' }
                const obk = {
                    'query': {
                        q: val
                    }
                }
                this.headLogin('goto', obj,obk)
                return
            }
            const re = {}
                
            re.q = val
            console.log(re)
            this.$router.push({ name: 'TrademarkSearchShiBei', query: re })
        }
    }
}
</script>

<style lang ='less' scoped>
.sebecomWidth {
    width: 1200px;
    margin: 0 auto;
    .fl {
        float: left;
    }
    .shili {
        display: none;
        position: absolute;
        top: 70px;
        width:700px;
        color: #ccc;
        font-size: 12px;
        background-color: #fff;
        z-index: 9;
    }
    .shilis {
        display: none;
        position: absolute;
        top: 48px;
        width:700px;
        color: #ccc;
        font-size: 12px;
        background-color: #fff;
        z-index: 9;
    }
    .shiliright {
        margin-left: 50px;
    }
    .color-red {
        color: red;
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
    .search-box {
        display:flex;
        width:700px;
        margin: 0 auto;
        justify-content: space-between;
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
        position: relative;
        width: 600px;
    }
    .areas {
        width: 700px;
        padding-top: 10px;
        margin: 0 auto;
        .ant-checkbox-group {
            width:100%;
        }
    }
}
</style>