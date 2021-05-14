<template>
    <!-- <div class="fixed_lan">
        <div class="pic_top">
          <img src="@/assets/img/pic_top.png" alt="" />
        </div>
        <ul>
          <li :class="{ active: tabflag == 1 }" @click="scollTo(1)">
            印象导览
          </li>
          <li :class="{ active: tabflag == 2 }" @click="scollTo(2)">
            活动快讯
          </li>
          <li :class="{ active: tabflag == 3 }" @click="scollTo(3)">
            互动好礼大派送
          </li>
          <li :class="{ active: tabflag == 4 }" @click="scollTo(4)">
            活动图集
          </li>
          <li :class="{ active: tabflag == 6 }" @click="scollTo(6)">
            直播入口
          </li>
          <li :class="{ active: tabflag == 7 }" @click="scollTo(7)">
            pick你的最爱
          </li>
          <li class="code1" @mouseover="showQrcode()" @mouseout="hideQrcode()">
            分享
            <div id="code" class="code" v-show="qrcodeFlag">
              <div id="qrcode" class="qrcode" ref="qrcode"></div>
            </div>
          </li>
        </ul>
        <div class="pic_bottom" @click="goUp">
          <img src="@/assets/img/top.png" alt="" />
        </div>
      </div> -->
      <div class="new_navBar">
        <div class="nav_top">
          <img src="@/assets/img/navbar.png" alt="">
        </div>
        <ul class="nav_list" v-if='routerFlag==1'>
          <li :class="{ active: tabflag == 1 }" @click="scollTo(1)">开幕活动</li>
          <li :class="{ active: tabflag == 2 }" @click="scollTo(2)">活动快讯</li>
          <li :class="{ active: tabflag == 3 }" @click="scollTo(3)">成果报道</li>
          <li :class="{ active: tabflag == 4 }" @click="scollTo(4)">雕塑大展</li>
          <li :class="{ active: tabflag == 5 }" @click="scollTo(5)">研讨会</li>
          <li :class="{ active: tabflag == 6 }" @click="scollTo(6)">主题展</li>
          <li @mouseover="showQrcode()" @mouseout="hideQrcode()">我要分享</li>
          <div id="code" class="code" v-show="qrcodeFlag">
            <div id="qrcode" class="qrcode" ref="qrcode"></div>
          </div>
        </ul>
        <ul class="nav_list" v-if='routerFlag==2'>
           <li :class="{ active: tabflag == 1 }" @click="backToHome()">返回首页</li>
           <li @mouseover="showQrcode()" @mouseout="hideQrcode()">我要分享</li>
          <div id="code" class="code2" v-show="qrcodeFlag">
            <div id="qrcode" class="qrcode" ref="qrcode"></div>
          </div>
        </ul>
        <ul class="nav_list" v-if='routerFlag==3'>
           <li :class="{ active: tabflag == 1 }" @click="backToHome()">返回首页</li>
        </ul>
        <div class="back_top" @click="goUp()">
          <div class="small_top">
            <img src="@/assets/img/ic_top.png" alt="">
          </div>
          <p>TOP</p>
        </div>
      </div>
</template>
<script>
import QRCode from 'qrcodejs2'
export default {
  props: {
    url: {
      type: String
    }
  },
  data() {
    return {
      qrcodeFlag: false,
      tabflag: 0,
      routerFlag: 1
    }
  },
  methods: {
    goUp() {
      let top = document.documentElement.scrollTop || document.body.scrollTop
      // 实现滚动效果
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top -= 50
        if (top <= 0) {
          clearInterval(timeTop)
        }
      }, 10)
    },
    creatQrcode(text) {
      this.qrcode = new QRCode('qrcode', {
        width: 90,
        height: 90,
        text: text, // 二维码地址
        colorDark: '#000',
        colorLight: '#fff'
      })
    },
    showQrcode() {
      var url = this.url
      this.$refs.qrcode.innerHTML = ''
      this.qrcodeFlag = true
      this.creatQrcode(url)
      console.log(url)
    },
    hideQrcode() {
      this.qrcodeFlag = false
      this.$refs.qrcode.innerHTML = ''
    },
    scollTo(num) {
      this.tabflag = num
      window.location.href =
        window.location.origin + window.location.pathname + '#tab' + num
    },
    backToHome() {
      this.$router.push({ path: '/' })
    },
    getUrl() {
      if (window.location.pathname === '/21dxdz/21dxdz') {
        this.routerFlag = 1
      } else if (window.location.pathname.indexOf('picshow_detail') > 0 || window.location.pathname.indexOf('character_detail') > 0) {
        this.routerFlag = 3
      } else {
        this.routerFlag = 2
      }
    }
  },
  created() {
    this.getUrl()
  }
}
</script>
<style lang="scss" scoped>
  .new_navBar{
    position: fixed;
    top: 100px;
    right: 110px;
    z-index: 99;
    width: 208px;
    .nav_top{
      width: 208px;
      height: 77px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .nav_list{
      position: relative;
      margin: 0 auto;
      background-color: #DE1C07;
      width: 140px;
      padding-top: 13px;
      padding-bottom: 13px;
      li{
        margin: 0 auto;
        width: 110px;
        cursor: pointer;
        height: 32px;
        background-color: #FFF9E1;
        text-align: center;
        line-height: 32px;
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: #DE1C07;
        margin-bottom: 10px;
        &:first-child{
          // margin-top: 12px;
        }
        &:last-child{
          margin-bottom: 0;
        }
      }
      .active{
        color: #FFF9E1;
        background-color: #DE1C07;
      }
    }
    .back_top{
        margin: 0 auto;
        width: 140px;
        background-color: #DE1C07;
        height: 70px;
        border-radius: 0px 0px 70px 70px;
        .small_top{
           margin: 0 auto;
          width: 20px;
          height: 20px;
          img{
            width: 100%;
            height: 100%;
          }
        }
        p{
          margin-top: 10px;
          text-align: center;
          font-size: 16px;
          font-family: Source Han Sans CN;
          font-weight: 500;
          color: #FFF9E1;
        }
    }
  }
  // .code1 {
  // position: relative;
  .code {
    position: absolute;
    width: 100px;
    height: 100px;
    left: -110px;
    top: 230px;
    padding: 5px;
    background-color: #ffffff;
    .qrcode {
      width: 70px;
      height: 70px;
      position: relative;
      // top: -7px;
      // right: 10px;
    }
  }
  .code2 {
    position: absolute;
    width: 100px;
    height: 100px;
    left: -110px;
    top: 25px;
    padding: 5px;
    background-color: #ffffff;
    .qrcode {
      width: 70px;
      height: 70px;
      position: relative;
      // top: -7px;
      // right: 10px;
    }
  }
// }
</style>
