<template>
  <div class="whole">
    <div class="kada_pc_picshow" v-if="!isMobile">
      <div class="bg_header"></div>
      <div class="pic_bg">
        <div class="act-container clearfix">
          <div class="kada_title_zj">
            <img src="@/assets/img/pc/img_title6.png" alt="" />
          </div>
          <!-- 各地红色主题展 -->
          <div class="area_list">
            <ul class="clearfix">
              <li
                v-for="(x, index) in Data.theme"
                v-show="index < 5"
                :key="index"
                @click="toDetail(x, 5)"
              >
                <div class="cover">
                  <img :src="x.picture" alt="" />
                </div>
                <div class="title">
                  <h3>{{ x.ocName }}</h3>
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
          <img src="@/assets/imgwx/new/img_title5.png" alt="" />
        </div>
        <div class="bord">
          <ul>
            <li
              v-for="(x, index) in Data.theme"
              :key="index"
              @click="toDetail(x, 5)"
            >
              <div class="cover">
                <img :src="x.picture" alt="" />
              </div>
              <h3>{{ x.ocName }}</h3>
              <!-- <p>{{}}</p> -->
            </li>
          </ul>
        </div>
      </div>
      <shareBack></shareBack>
    </div>
  </div>
</template>
<script>
import Data from '@/data/staticData'
import { mapGetters } from 'vuex'
import navBar from './components/navigatonBar'
import shareBack from './components/shareAndback'
import wxService from '@/api/wxService'
var imgURrl = require('@/assets/imgwx/shareicon.png')
export default {
  computed: {
    ...mapGetters(['isMobile', 'userInfo'])
  },
  components: {
    navBar,
    shareBack
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
    toPath(path) {
      window.open(path)
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
.area_list {
  margin-top: 39px;
  ul {
    li {
      float: left;
      margin-right: 10px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      .cover {
        width: 232px;
        height: 145px;
        img {
          width: 100%;
          height: 100%;
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
      width: 48%;
      margin-bottom: 0.25rem;
      margin-right: 0.18rem;
      &:nth-child(2n) {
        margin-right: 0;
      }
      .cover {
        width: 100%;
        height: 2.12rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      h3 {
        margin-top: 0.2rem;
        font-size: 0.28rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
      }
      p {
        margin-top: 0.14rem;
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

