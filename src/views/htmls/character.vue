<template>
  <div class="whole">
    <div class="kada_pc_picshow" v-if="!isMobile">
      <div class="bg_header"></div>
      <div class="pic_bg">
        <div class="act-container clearfix">
          <div class="kada_title_zj">
            <img src="@/assets/img/pc/img_title5.png" alt="" />
          </div>
          <div class="character" id="tab6">
            <ul class="clearfix">
              <li
                v-for="(value, key) in Data.character"
                :key="key"
                @click="toDetail(value, 4)"
              >
                <div class="cover">
                  <img :src="value.cover" alt="" />
                  <div class="shadow"></div>
                </div>
                <div class="title">
                  <h3>{{ value.name }}</h3>
                  <p>{{ value.theme | substr(10) }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <navBar :url="url"></navBar>
    </div>
    <div class="kada_wx_picshow" v-if="isMobile">
      <!-- <div class="headerbg"></div> -->
      <div class="kada_list">
        <div class="pic_cont">
          <img src="@/assets/imgwx/new/img_title4.png" alt="" />
        </div>
        <div class="bord">
          <ul>
            <li
              v-for="(value, key) in Data.character"
              :key="key"
              @click="toDetail(value, 4)"
            >
              <div class="cover">
                <img :src="value.cover" alt="" />
              </div>
              <h3>{{ value.name }}</h3>
              <p>{{ value.theme | substr(7) }}</p>
            </li>
          </ul>
        </div>
      </div>
      <!-- 分享 返回顶部 -->
      <!-- 悬浮按钮 -->
      <div class="top-share">
        <div class="listleft" @click="shareAlert()">
          <img src="@/assets/imgwx/wx_share.png" alt />
        </div>
        <div class="listtwo" @click="toTo()">
          <img src="@/assets/imgwx/backtop.png" alt />
          <!-- <span>返回<br>顶部</span> -->
        </div>
      </div>
      <!--微信分享指示-->
      <div
        class="hom-sharewraper"
        id="hom-sharewraper"
        style="display: none"
        @click="closedAlert()"
      >
        <img src="@/assets/imgwx/share-alert.png" />
      </div>
    </div>
  </div>
</template>
<script>
import QRCode from 'qrcodejs2'
import Data from '@/data/staticData'
import { mapGetters } from 'vuex'
import navBar from './components/navigatonBar'
import wxService from '@/api/wxService'
var imgURrl = require('@/assets/imgwx/shareicon.png')
export default {
  computed: {
    ...mapGetters(['isMobile', 'userInfo'])
  },
  components: {
    navBar
  },
  data() {
    return {
      Data: {
        news: []
      },
      qrcodeFlag: false,
      url: window.location.href
    }
  },
  methods: {
    toDetail(x, num) {
      if (num === 1 || num === 2) {
        window.open(x.ocUri)
      } else if (num === 3) {
        this.$router.push({
          name: 'picshow_detail',
          params: {
            ocCode: x.ocCode
          }
        })
      } else if (num === 4) {
        this.$router.push({
          name: 'character_detail',
          params: {
            ocCode: x.name
          }
        })
      }
    },
    back() {
      this.$router.push({ path: '/' })
    },
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
    toPath(path) {
      window.open(path)
    },
    toTo() {
      window.scrollTo(0, 0)
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
    creatQrcode(text) {
      this.qrcode = new QRCode('qrcode', {
        width: 90,
        height: 90,
        text: text, // 二维码地址
        colorDark: '#000',
        colorLight: '#fff'
      })
    },
    shareAlert() {
      document.getElementById('hom-sharewraper').style.display = 'block'
    },
    closedAlert() {
      document.getElementById('hom-sharewraper').style.display = 'none'
    }
  },
  mounted() {
    this.Data = Data
    if (this.isMobile) {
      var shareConfig = {}
      shareConfig.currentTitle = '“群星璀璨共谱时代华章”浙江省红色主题雕塑大展'
      shareConfig.share_url = window.location.href
      shareConfig.currentCover = window.location.origin + '/21dxdz/' + imgURrl
      shareConfig.currentDetail = '11月21日，与您相约'
      // console.log('分享参数：', shareConfig)
      wxService.setWXConfig(shareConfig)
    }
  }
}
</script>
<style lang="scss" scoped>
.top-share {
  position: fixed;
  right: 0;
  top: 7.6rem;
  z-index: 99;
  /* z-index: 999;s */
  .listleft {
    width: 1.2rem;
    height: 1.2rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .listtwo {
    margin-top: 0.5rem;
    width: 1.2rem;
    height: 1.2rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.hom-sharewraper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 100;
  padding-top: 0.6rem;
  padding-left: 2.3rem;
}
.hom-sharewraper img {
  display: block;
  width: 4.77rem;
  height: 3.68rem;
}
.code1 {
  position: relative;
  .code {
    position: absolute;
    width: 100px;
    height: 100px;
    left: -110px;
    top: -10px;
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
}
.character {
  margin-top: 39px;
  ul {
    li {
      float: left;
      margin-right: 35px;
      &:nth-child(6n) {
        margin-right: 0;
      }
      .cover {
        width: 170px;
        height: 170px;
        position: relative;
        z-index: 9;
        img {
          width: 100%;
          height: 100%;
        }
        .shadow {
          position: absolute;
          top: 5px;
          right: -5px;
          width: 170px;
          height: 170px;
          z-index: -1;
          background-color: #c7161d;
        }
      }
      .title {
        padding-top: 20px;
        h3 {
          font-size: 18px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #333333;
          padding-bottom: 10px;
        }
        p {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #999999;
          margin-bottom: 22px;
        }
      }
    }
  }
}
.bord {
  padding: 0 0.26rem;
  ul {
    margin-top: 0.4rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      width: 2.12rem;
      margin-bottom: 0.36rem;
      margin-right: 0.3rem;
      &:nth-child(3n) {
        margin-right: 0;
      }
      .cover {
        width: 2.12rem;
        height: 2.12rem;
        position: relative;
        z-index: 9;
        &::after {
          content: '';
          position: absolute;
          top: 0.04rem;
          right: -0.04rem;
          width: 2.12rem;
          background-color: #c7151d;
          z-index: -1;
          height: 2.12rem;
        }

        img {
          width: 100%;
          height: 100%;
        }
      }
      h3 {
        margin-top: 0.16rem;
        font-size: 0.28rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
      }
      p {
        margin-top: 0.13rem;
        font-size: 0.24rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: #999999;
      }
    }
  }
}
// .kada_title10{
//   background: url(../../);
// }
</style>

