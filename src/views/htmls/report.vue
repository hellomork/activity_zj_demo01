<template>
  <div class="whole">
    <div class="kada_pc_picshow" v-if="!isMobile">
      <div class="bg_header"></div>
      <div class="pic_bg">
        <div class="act-container clearfix">
          <div class="kada_title_zj">
            <img src="@/assets/img/pc/img_title3.png" alt="" />
          </div>
          <div class="boder">
            <div class="picshow1">
              <ul class="clearfix">
                <li
                  v-for="(one, index) in Data.report"
                  :key="index"
                  @click="toPath(one.ocUri)"
                >
                  <h3>
                    {{ one.ocName }}
                  </h3>
                  <div class="des">
                    <span>发布人：{{ one.company }}</span
                    ><span>发布时间：{{ one.ocTime }}</span>
                  </div>
                </li>
              </ul>
              <!-- <div class="kada_more">查看更多</div> -->
            </div>
          </div>
        </div>
      </div>
      <navBar :url="url"></navBar>
    </div>
    <div class="kada_wx_picshow" v-if="isMobile">
      <!-- <div class="headerbg"></div> -->
      <div class="kada_list">
        <div class="pic_cont">
          <img src="@/assets/imgwx/new/img_title2.png" alt="" />
        </div>
        <div class="boder">
          <div class="n_boder">
            <!-- <div class="title_top1">
              活动快讯
            </div> -->
            <div
              class="news_list"
              v-for="(news, index) in Data.report"
              :key="index"
              @click="toPath(news.ocUri)"
            >
              <h3>{{ news.ocName }}</h3>
              <span>发布时间：{{ news.ocTime }}</span>
            </div>
          </div>
        </div>
      </div>
        <shareBack></shareBack>
    </div>
  </div>
</template>
<script>
import Data from '@/data/staticData'
import { mapGetters } from 'vuex'
import shareBack from './components/shareAndback'
import navBar from './components/navigatonBar'
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
    toPath(path) {
      window.open(path)
    }
  },
  mounted() {
    this.Data = Data
    if (this.isMobile) {
      var shareConfig = {}
      shareConfig.currentTitle = '“迎建党百年 享美好生活”浙江省喜迎建党百年红色主题雕塑展'
      shareConfig.share_url = window.location.href
      shareConfig.currentCover = window.location.origin + '/21dxdz/' + imgURrl
      shareConfig.currentDetail = '6月11日，与您相约'
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
// .kada_title10{
//   background: url(../../);
// }
</style>

