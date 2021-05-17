<template>
  <div class="whole">
    <div class="kada_pc" v-if="!isMobile">
      <div class="bg_header" id="tab1"></div>
      <div class="bg_bgwhole">
        <div class="act-container clearfix">
          <div class="kada_title_zj">
            <img src="@/assets/img/pc/img_title1.png" alt="" />
          </div>
          <!-- 开幕活动 -->
          <div class="start_activity clearfix">
            <div class="img" id="tab2">
              <video
                ref="audio"
                controls
                :src="implement[0].video"
                :poster="implement[0].picture"
              ></video>
            </div>
            <div class="list_menu">
              <ul>
                <li
                  v-for="(item, index) in implement"
                  :key="index"
                  @click="toOpenImplement(item)"
                >
                  {{ item.ocName }}
                </li>
              </ul>
            </div>
          </div>
          <div class="kada_title_zj" id="tab3">
            <img src="@/assets/img/pc/img_title2.png" alt="" />
            <div class="more clearfix" @click="toList('/news')">
              <span>更多</span>
              <div class="icon_add">
                <svg-icon icon-class="add" />
              </div>
            </div>
          </div>
          <!-- 活动快讯 -->
          <div class="activity_firstknow clearfix">
            <div class="first_line">
              <ul>
                <li
                  v-for="(item, index) in Data.news"
                  v-show="index < 4"
                  :key="index"
                  @click="toDetail(item, 1)"
                >
                  <h3>{{ item.ocName | substr(30) }}</h3>
                  <span>{{ item.ocTime }}</span>
                </li>
              </ul>
            </div>
            <div class="second_line">
              <ul>
                <li
                  v-for="(item, index) in Data.news"
                  v-show="index > 3 && index < 8"
                  :key="index"
                  @click="toDetail(item, 1)"
                >
                  <h3>{{ item.ocName | substr(30) }}</h3>
                  <span>{{ item.ocTime }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="kada_title_zj" id="tab4">
            <img src="@/assets/img/pc/img_title3.png" alt="" />
            <div class="more clearfix" @click="toList('/report')">
              <span>更多</span>
              <div class="icon_add">
                <svg-icon icon-class="add" />
              </div>
            </div>
          </div>
        </div>
        <!-- 成果报道 -->
        <div class="special_container">
          <div class="medio_report">
            <div class="content clearfix">
              <div class="first_line">
                <ul>
                  <li
                    v-for="(item, index) in Data.report"
                    v-show="index < 4"
                    :key="index"
                    @click="toDetail(item, 2)"
                  >
                    <h3>{{ item.ocName | substr(29) }}</h3>
                    <span>{{ item.ocTime }}</span>
                  </li>
                </ul>
              </div>
              <div class="second_line">
                <ul>
                  <li
                    v-for="(item, index) in Data.report"
                    v-show="index > 3 && index < 8"
                    :key="index"
                    @click="toDetail(item, 2)"
                  >
                    <h3>{{ item.ocName | substr(29) }}</h3>
                    <span>{{ item.ocTime }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="act-container clearfix">
          <div class="kada_title_zj">
            <img src="@/assets/img/pc/img_title4.png" alt="" />
            <div class="more clearfix" @click="toList('/picshow')">
              <span>更多</span>
              <div class="icon_add">
                <svg-icon icon-class="add" />
              </div>
            </div>
          </div>
          <!-- 红色主题雕塑大展 -->
          <div class="sculpture_list" id="tab5">
            <ul class="clearfix">
              <li
                v-for="(x, index) in pickList"
                :key="index"
                @click="toDetail(x, 3)"
              >
                <div class="cover">
                  <img :src="x.ocCover" alt="" />
                </div>
                <div class="title">
                  <h3>{{ x.ocName }}</h3>
                  <p>{{ x.ocWrite }}</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="kada_title_zj">
            <img src="@/assets/img/pc/img_title5.png" alt="" />
            <div class="more clearfix" @click="toList('/character')">
              <span>更多</span>
              <div class="icon_add">
                <svg-icon icon-class="add" />
              </div>
            </div>
          </div>
          <!-- 红色主题雕塑研讨会 -->
          <div class="character" id="tab6">
            <ul class="clearfix">
              <li
                @click="toDetail(value, 4)"
                v-for="(value, key) in Data.characterFive"
                :key="key"
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
          <div class="kada_title_zj">
            <img src="@/assets/img/pc/img_title6.png" alt="" />
            <div class="more clearfix" @click="toList('/theme')">
              <span>更多</span>
              <div class="icon_add">
                <svg-icon icon-class="add" />
              </div>
            </div>
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
          <div class="kada_title_zj">
            <img src="@/assets/img/pc/img_title7.png" alt="" />
            <div class="more clearfix">
              <span>更多</span>
              <div class="icon_add">
                <svg-icon icon-class="add" />
              </div>
            </div>
          </div>
          <!--享受美好生活 -->
          <div class="live">
            <ul class="ul2 clearfix">
              <li>
                <div class="bord clearfix">
                  <div class="l clearfix">
                    <span>0</span>
                    <i>1</i>
                  </div>
                  <div class="c">
                    <!-- <img src="@/assets/img/pc/img_line_red.png" alt=""> -->
                  </div>
                  <div class="r">
                    <h3>守好红色根脉·书写青春忠诚</h3>
                    <h3>浙江省民间音舞大型广场展演</h3>
                  </div>
                </div>
              </li>
              <li>
                <div class="bord clearfix">
                  <div class="l clearfix">
                    <span>0</span>
                    <i>1</i>
                  </div>
                  <div class="c">
                    <!-- <img src="@/assets/img/sideline.png" alt=""> -->
                  </div>
                  <div class="r">
                    <h3>守好红色根脉·书写青春忠诚</h3>
                    <h3>浙江省民间音舞大型广场展演</h3>
                  </div>
                </div>
              </li>
              <li>
                <div class="bord clearfix">
                  <div class="l clearfix">
                    <span>0</span>
                    <i>1</i>
                  </div>
                  <div class="c">
                    <!-- <img src="@/assets/img/sideline.png" alt=""> -->
                  </div>
                  <div class="r">
                    <h3>守好红色根脉·书写青春忠诚</h3>
                    <h3>浙江省民间音舞大型广场展演</h3>
                  </div>
                </div>
              </li>
              <li>
                <div class="bord clearfix">
                  <div class="l clearfix">
                    <span>0</span>
                    <i>1</i>
                  </div>
                  <div class="c">
                    <!-- <img src="@/assets/img/si/deline.png" alt=""> -->
                  </div>
                  <div class="r">
                    <h3>守好红色根脉·书写青春忠诚</h3>
                    <h3>浙江省民间音舞大型广场展演</h3>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <navBar :url="url"></navBar>
    </div>
    <div class="kada_wx" id="kada_wx" v-if="isMobile">
      <div
        class="top_cont claerfix"
        ref="top_cont"
        id="top_cont"
        @click="toshow()"
      >
        <p>浙江省喜迎建党百年红色主题雕塑展</p>
        <img
          id="closeImg"
          ref="closeImg"
          src="@/assets/imgwx/new/ic_meau.png"
          alt=""
        />
      </div>
      <div class="nav_list_box" id="nav_list_box">
        <div class="close" @click="toclose()">
          <img src="@/assets/imgwx/new/ic_off.png" alt="" />
        </div>
        <div class="nav_choose_list">
          <ul>
            <li :class="{ active1: navNum == 1 }" @click.stop="toNav(1)">
              首页
            </li>
            <li :class="{ active2: navNum == 2 }" @click.stop="toNav(2)">
              开幕活动
            </li>
            <li :class="{ active3: navNum == 3 }" @click.stop="toNav(3)">
              活动报道
            </li>
            <li :class="{ active4: navNum == 4 }" @click.stop="toNav(4)">
              红色主题雕塑展
            </li>
            <li :class="{ active5: navNum == 5 }" @click.stop="toNav(5)">
              红色主题雕塑研讨会
            </li>
            <li :class="{ active6: navNum == 6 }" @click.stop="toNav(6)">
              各地红色主题展
            </li>
            <li :class="{ active7: navNum == 7 }" @click.stop="toNav(7)">
              迎党百年 享美好生活系列活动
            </li>
          </ul>
        </div>
      </div>

      <swiper
        :options="scrollSwiper"
        ref="scrollSwiper"
        :style="{ height: wxIphoneHeight + 'px' }"
      >
        <swiper-slide class="slide1">
          <div class="content1"></div>
          <div class="kada-bar">
            <!-- <dynamic/> -->
            <lottie
              :options="defaultOptions"
              :height="103"
              :width="68"
              v-on:animCreated="handleAnimation"
            />
          </div>
          <div class="bg_coo"></div>
        </swiper-slide>
        <swiper-slide class="slide2">
          <div class="content">
            <div class="pic_cont">
              <img src="@/assets/imgwx/new/img_title1.png" alt="" />
            </div>
            <div class="lunbo">
              <swiper :options="lunboSwiper" ref="lunboSwiper">
                <swiper-slide
                  class="lunslide"
                  v-for="(item, index) in implement"
                  :key="index"
                  @click="toOpenImplement(item)"
                >
                  <img :src="item.picture" alt="" />
                </swiper-slide>
              </swiper>
              <div class="swiper-pagination number_swiper"></div>
            </div>
            <div class="ic_more">
              <p>查看更多</p>
              <img src="@/assets/imgwx/ic_more.png" alt="" />
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="slide3">
          <div class="content">
            <div class="pic_cont">
              <img src="@/assets/imgwx/new/img_title2.png" alt="" />
            </div>
            <div class="bord">
              <div class="change_report">
                <ul>
                  <li
                    class="choose1"
                    :class="{ choose_hover1: numChange == 1 }"
                    @click="changeChick(1)"
                  >
                    <!-- <img src="@/assets/imgwx/new/img_tab1_nor.png" alt=""> -->
                  </li>
                  <li
                    class="choose2"
                    :class="{ choose_hover2: numChange == 2 }"
                    @click="changeChick(2)"
                  >
                    <!-- <img src="@/assets/imgwx/new/img_tab2_nor.png" alt=""> -->
                  </li>
                </ul>
              </div>
              <div class="articl1e" v-if="numChange == 1">
                <ul>
                  <li
                    v-for="(item, index) in Data.news"
                    v-show="index < 4"
                    :key="index"
                    @click="toDetail(item, 1)"
                  >
                    <h3>{{ item.ocName | substr(20) }}</h3>
                    <span>{{ item.ocTime }}</span>
                  </li>
                </ul>
              </div>
              <div class="articl1e" v-if="numChange == 2">
                <ul>
                  <li
                    v-for="(item, index) in Data.report"
                    v-show="index < 4"
                    :key="index"
                    @click="toDetail(item, 2)"
                  >
                    <h3>{{ item.ocName | substr(20) }}</h3>
                    <span>{{ item.ocTime }}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="ic_more" v-if="numChange == 1" @click="toList('/news')">
              <p>查看更多</p>
              <img src="@/assets/imgwx/ic_more.png" alt="" />
            </div>
            <div
              class="ic_more"
              v-if="numChange == 2"
              @click="toList('/report')"
            >
              <p>查看更多</p>
              <img src="@/assets/imgwx/ic_more.png" alt="" />
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="slide4">
          <div class="content">
            <div class="pic_cont">
              <img src="@/assets/imgwx/new/img_title3.png" alt="" />
            </div>
            <div class="bord">
              <ul>
                <li
                  v-for="(x, index) in pickList"
                  :key="index"
                  @click="toDetail(x, 3)"
                >
                  <div class="cover">
                    <img :src="x.ocCover" alt="" />
                  </div>
                  <h3>{{ x.ocName }}</h3>
                  <p>{{ x.ocWrite }}</p>
                </li>
              </ul>
            </div>
            <div class="ic_more" @click="toList('/picshow')">
              <p>查看更多</p>
              <img src="@/assets/imgwx/ic_more.png" alt="" />
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="slide5">
          <div class="content">
            <div class="pic_cont">
              <img src="@/assets/imgwx/new/img_title4.png" alt="" />
            </div>
            <div class="bord">
              <ul>
                <li
                  v-for="(value, key) in Data.characterFive"
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
            <div class="ic_more" @click="toList('/character')">
              <p>查看更多</p>
              <img src="@/assets/imgwx/ic_more.png" alt="" />
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="slide6">
          <div class="content">
            <div class="pic_cont">
              <img src="@/assets/imgwx/new/img_title5.png" alt="" />
            </div>
            <div class="bord">
              <ul>
                <li
                  v-for="(x, index) in Data.theme"
                  v-show="index < 4"
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
            <div class="ic_more" @click="toList('/theme')">
              <p>查看更多</p>
              <img src="@/assets/imgwx/ic_more.png" alt="" />
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="slide7">
          <div class="content">
            <div class="pic_cont">
              <img src="@/assets/imgwx/new/img_title6.png" alt="" />
            </div>
            <div class="bord">
              <ul>
                <li>
                  <h3>我是作品名称</h3>
                  <img src="@/assets/imgwx/new/back.png" alt="" />
                </li>
                <li>
                  <h3>我是作品名称</h3>
                  <img src="@/assets/imgwx/new/back.png" alt="" />
                </li>
                <li>
                  <h3>我是作品名称</h3>
                  <img src="@/assets/imgwx/new/back.png" alt="" />
                </li>
              </ul>
            </div>
            <div class="ic_more">
              <p>查看更多</p>
              <img src="@/assets/imgwx/ic_more.png" alt="" />
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<script>
import * as animationData from '@/assets/lottie/dys.json'
import QRCode from 'qrcodejs2'
import Data from '@/data/staticData'
import navBar from './components/navigatonBar'
import { mapGetters } from 'vuex'
import wxService from '@/api/wxService'
var imgURrl = require('@/assets/imgwx/shareicon.png')
export default {
  name: 'Index',
  computed: {
    ...mapGetters(['isMobile', 'userInfo'])
    // swiper(

    // )
  },
  components: {
    navBar
  },
  data() {
    return {
      implement: [
        {
          video: '',
          picture: ''
        }
      ], // 开幕活动
      show: false,
      wxIphoneHeight: 600,
      defaultOptions: { animationData: animationData },
      animationSpeed: 1,
      anim: {},
      pickList: [],
      flag: false,
      ocName: '',
      qrcodeFlag: false,
      teamCode: null,
      searchSort: 3,
      pictureList: Data.picList,
      sidelightsList: [],
      // liveUrl:'',
      uriFlag: 0,
      Data: {
        news: [],
        report: [],
        picList: [],
        sidelightsList: [],
        characterFive: {}
      },
      mapLen: 0,
      tabflag: 0,
      scrollSwiper: {
        direction: 'vertical',
        height: window.innerHeight,
        slidesPerView: 1,
        speed: 800,
        // ~~~~~解决 手机上横向滑动的时候出现卡顿的bug  start~~~~~~~~
        observer: true, // 修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, // 修改swiper的父元素时，自动初始化swiper
        touchRatio: 1, // 解决滑动卡顿
        longSwipesRatio: 0.1,
        threshold: 10, // 如果触摸距离小于该值滑块不会被拖动
        followFinger: false,
        // ~~~~~解决 手机上横向滑动的时候出现卡顿的bug end~~~~~~~~
        onSlideChangeStart: function(swiper) {
          // alert(swiper.activeIndex)
          if (swiper.activeIndex === 0) {
            // console.log(this.$refs.top_cont)
            document.getElementById('top_cont').style.display = 'none'
          } else {
            document.getElementById('top_cont').style.display = 'block'
          }
        }
      },
      lunboSwiper: {
        effect: 'coverflow',
        slidesPerView: 1.1,
        initialSlide: 1,
        autoplay: 3000,
        centeredSlides: true,
        coverflow: {
          // 动画参数，官网的效果不是我需要的，我不需要y轴旋转
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 5,
          slideShadows: true
        },
        pagination: '.swiper-pagination',
        paginationType: 'fraction'
      },
      url: window.location.href,
      numChange: 1,
      navNum: 1
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
    toList(path) {
      this.$router.push({ path: path })
    },
    toOpenImplement(item) {
      this.$refs.audio.poster = item.picture
      this.$refs.audio.src = item.video
    },
    toshow() {
      document.getElementById('nav_list_box').style.display = 'block'
      this.$refs.closeImg.style.display = 'none'
      // document.getElementById('kada_wx').style.filter = 'blur(20px)'
    },
    toclose() {
      // document.getElementById('kada_wx').style.filter = 'blur(0px)'
      document.getElementById('nav_list_box').style.display = 'none'
      this.$refs.closeImg.style.display = 'block'
    },
    toNav(num) {
      this.navNum = num
      if (num === 1) {
        document.getElementById('top_cont').style.display = 'none'
      } else {
        document.getElementById('top_cont').style.display = 'block'
      }
      document.getElementById('nav_list_box').style.display = 'none'
      this.$refs.closeImg.style.display = 'block'
      this.$refs.scrollSwiper.$swiper.slideTo(num - 1, 1000, false)
    },
    changeChick(num) {
      this.numChange = num
    },
    handleAnimation: function(anim) {
      this.anim = anim
      console.log(anim) // 这里可以看到 lottie 对象的全部属性
    },
    toMore(path) {
      this.$router.push({ path: path })
    },
    toVideoAuto() {
      document.addEventListener(
        'WeixinJSBridgeReady',
        function() {
          document.getElementById('video').play()
        },
        false
      )
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
    },
    scollTo(num) {
      this.tabflag = num
      window.location.href =
        window.location.origin + window.location.pathname + '#tab' + num
    },
    getPickList() {
      const _this = this
      const params = {}
      params.status = 1
      params.operateCode = 'c0612dbe-b2ec-11eb-8ecb-b8599f37e6f0'
      // params.searchSort = this.searchSort
      if (this.isMobile) {
        params.pageSize = 4
      } else {
        params.pageSize = 10
      }
      params.ocName = this.ocName
      this.$apis.getList(params).then((res) => {
        _this.pickList = res.data.data.list
        console.log(_this.pickList)
      })
    }
  },
  created() {
    this.wxIphoneHeight = document.documentElement.clientHeight
  },
  mounted() {
    this.Data = Data
    // console.log('zhangsan',this.Data.character['张三'].brief)
    // console.log(Object.getOwnPropertyNames(this.Data.character).length);
    this.implement = Data.implement
    this.pictureList = Data.picList
    this.mapLen = Object.getOwnPropertyNames(this.Data.character).length
    this.getPickList()
    if (this.isMobile) {
      this.toVideoAuto()
      var shareConfig = {}
      shareConfig.currentTitle =
        '“群星璀璨  共谱时代华章”浙江省红色主题雕塑大展'
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
.btn_wx {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 4.7rem;
  width: 2rem;
  height: 0.5rem;
  box-shadow: 0px 0.08rem 0.25rem 0.08rem rgba(139, 12, 23, 0.4);
  background: #f9ecc6;
  border-radius: 0.25rem;
  font-size: 0.24rem;
  font-family: PingFang SC;
  font-weight: 500;
  color: #a1000c;
  text-align: center;
  line-height: 0.5rem;
}
.kada-wxnews-swiper {
  // width: 2.97rem;
  width: 4.5rem;
  height: 0.83rem;
  float: left;
  margin-left: 0.5rem;
  overflow: hidden;
  padding: 0.05rem 0.17rem 0.05rem 0.14rem;
  // background-color: rgb(248, 248, 248);
  .swiper-container {
    height: 0.83rem;
  }
  .kada-wxnews-slider {
    height: 100%;
    p {
      padding: 0rem 0 0.2rem 0;
      font-size: 0.22rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 0.28rem;
    }
  }
}

.song {
  width: 100%;
  margin-top: 10px;
  height: 36px;
  text-align: center;
  // padding-left: 80px;
  background: #de1c07;
  border-radius: 4px;
  img {
    margin-top: 8px;
    float: left !important;
  }
  p {
    // float: left;
    // margin-left: 10px;/@at-root
    // margin-top: 12px !important;
    text-align: center;
    line-height: 36px;
    font-size: 14px !important;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #fff9e1 !important;
  }
}

// body{
//   //  position: relative;
//     height: 100%;
// }
</style>
