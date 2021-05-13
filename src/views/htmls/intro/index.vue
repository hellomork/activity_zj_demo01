<template>
  <div class="intro11">
    <!-- pc-start -->
    <div class="phonePicShow" v-if="!isMobile">
      <div class="bg-header">
        <div class="bg-body">
        </div>
      </div>
      <div class="header-title">
        <div class="act-container">
          <ul>
            <li class="active" @click="toggle('/intro')">活动介绍</li>
            <li @click="toggle('/picshow')">作品展示</li>
            <li @click="toggle('/result')">结果公示</li>
          </ul>
        </div>
      </div>
      <div class="contain">
        <div class="act-container">
          <body-t></body-t>
        </div>
      </div>

      <to-top  :url="url"></to-top>
    </div>
    <!-- pc-end -->

    <!-- wx-start -->
    <div class="WXphonePicShow" v-if="isMobile">
      <wxbanner></wxbanner>
      <!-- 标题 -->
      <div class="title_top">
        <swiper :options="swiperOption1" ref="mySwiper">
          <!-- v-for="(one,index) in data" :key="index" @click.native="openUrl(one.pcPath)" -->
          <swiper-slide>
            <div class="describe active" @click="toggle('/intro')">活动介绍</div>
          </swiper-slide>
          <swiper-slide>
            <div class="describe" @click="toggle('/picshow')">作品展示</div>
          </swiper-slide>
          <swiper-slide>
            <div class="describe" @click="toggle('/result')">结果公示</div>
          </swiper-slide>
        </swiper>
      </div>
      <!-- 首页活动介绍部分 -->
      <div class="article">
        <div class="intro">
          <!-- <div class="intro_title">
            <img src="@/assets/imgwx/title_intro.png" alt />
          </div> -->
          <p class="title">活动介绍</p>
          <p
            class="first"
          >为深入贯彻习近平新时代中国特色社会主义思想和党的十九大、十九届二中、三中、四中全会精神，助力文化旅游深度融合发展，彰显我省文化旅游资源特色和优势，同时推进公共文化服务数字化建设，激发基层群众参与文化创作的热情，提升人民群众在文化活动中的获得感、幸福感。经研究，决定举办“艺游浙江·文化馆的VLOG”浙江省手机微视频大赛。</p>

          <p class="title">投票规则</p>
          <div class="require1">
            <p>投票时间：2020.09.11-2020.09.25</p>
            <p>投票规则：每天所有作品都可以投票，同一个作品最多投5票。</p>
            <!-- <p>投票规则：一天可以投5票，同一作品只可投一票（提示：你今天还有几票的机会）。</p> -->
          </div>

          <p class="title">评审规则</p>
          <div class="require1">
            <h3>1.网络评审：</h3>
            <p>按照投票数依次排出网络人气作品10件、网络活力作品10件、网络魅力作品10件。</p>
            <h3>2.专家评审：</h3>
            <p>线下组织专家评审，评选优秀内容5件、优秀拍摄5件、优秀构思5件、优秀剪辑5件、其余优秀作品20件。</p>
          </div>

          <p class="title">注意事项</p>
          <div class="require1">
            <p>严禁刷票，一经查实严肃处理。</p>
          </div>

          <p class="title">友情链接</p>
          <ul class="links-ul">
            <li @click="tolink('https://app.culturedc.cn/web2.1/index.html')">
              <img  src="@/assets/imgwx/logo_yun.png">
              <p>国家公共文化云</p>
            </li>
            <li @click="tolink('https://app.culturedc.cn/thematic/cultureChina/index.html')">
              <img  src="@/assets/imgwx/logo_yun.png">
              <p>“文化中国”微视频征集暨“乡村拍手”计划</p>
            </li>
            <li @click="tolink('http://www.zjart.com/zjspc/index')">
              <img  src="@/assets/imgwx/logo_zj.png">
              <p>浙江省文化馆</p>
            </li>
          </ul>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import swiperH from '../components/swiper'
import bodyT from '../components/body'
import toTop from '../components/layout'
import wxbanner from '../components/wxbanner'
import wxService from '@/api/wxService'
var imgURrl = require('../../../assets/imgwx/shareicon.png')
export default {
  components: {
    swiperH,
    bodyT,
    toTop,
    wxbanner
  },
  computed: {
    ...mapGetters(['isMobile'])
  },
  data() {
    return {
      id: this.$route.params.id,
      //   num: this.$route.params.id,
      num: 0,
      sortNum: 1,
      url: window.location.href,
      teachersort: 0,
      swiperOption1: {
        slidesPerView: 3
      }
    }
  },
  methods: {
    toggle(path) {
      if (path === '/review' || path === '/result') {
        this.$toast.fail('未开始，敬请期待！')
      } else if (path === '/new') {
        window.location.href = 'http://www.zjart.com/zjspc/news'
      } else {
        this.$router.push({ path: path })
      }
    },
    tolink(url) {
      window.location.href = url
    },
    check(sortNum) {
      this.sortNum = sortNum
    },
    toPath(path) {
      this.$router.push({ path: path })
    },
    openUrl(url) {
      window.open(url)
    }
  },
  mounted() {
    if (this.isMobile) {
      var shareConfig = {}
      shareConfig.currentTitle = '“艺游浙江·文化馆的VLOG”浙江省手机微视频大赛'
      shareConfig.share_url = window.location.href
      shareConfig.currentCover = window.location.origin + '/20videos/' + imgURrl
      shareConfig.currentDetail = '“艺游浙江·文化馆的VLOG”浙江省手机微视频大赛'
      // console.log('分享参数：', shareConfig)
      wxService.setWXConfig(shareConfig)
    }
  }
}
</script>

