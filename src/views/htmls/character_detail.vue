<template>
  <div>
    <div class="character_detail" v-if="!isMobile">
      <div class="pic_head">
        <div class="act-container">
          <h3>浙江省喜迎建党百年红色主题雕塑展</h3>
        </div>
      </div>
      <div class="act-container character_list">
        <div class="intro clearfix">
          <div class="img">
            <img :src="characterDetail.cover" alt="" />
            <div class="boder"></div>
          </div>
          <div class="c">
            <h3>{{ characterDetail.name }}</h3>
            <img src="@/assets/img/pc/ic_s.png" alt="" />
            <p>研讨主题</p>
            <span>{{ characterDetail.theme }}</span>
          </div>
          <div
            class="wechat"
            @mouseover="showQrcode()"
            @mouseout="hideQrcode()"
          >
            <svg-icon icon-class="wechat1" />
          </div>
          <div id="code" class="code2" v-show="qrcodeFlag">
            <div id="qrcode" class="qrcode" ref="qrcode"></div>
          </div>
        </div>
        <div class="line"></div>
        <div class="brief">
          <img src="@/assets/img/pc/111.png" alt="" />
        </div>
        <p v-for="(x, index) in characterBriefList" :key="'first' + index">
          {{ x }}
        </p>
        <div class="brief">
          <img src="@/assets/img/pc/222.png" alt="" />
        </div>
        <p v-for="(x, index) in characterContentList" :key="index">{{ x }}</p>
        <div class="brief">
          <img src="@/assets/img/pc/333.png" alt="" />
        </div>
        <div class="zuopin">
          <ul class="clearfix">
            <li
              v-for="(x, index) in presonList"
              :key="'person' + index"
              @click="toDetail(x)"
            >
              <div class="cover">
                <img :src="x.ocCover" alt="" />
              </div>
              <h3>{{ x.ocName }}</h3>
            </li>
          </ul>
        </div>
      </div>
       <navBar :url="url"></navBar>
    </div>
    <div class="wx_character_detail" v-if="isMobile">
        <shareBack></shareBack>
      <div class="top clearfix">
        <div class="cover">
          <img :src="characterDetail.cover" alt="" />
        </div>
        <div class="des">
          <h3>{{ characterDetail.name }}</h3>
          <img src="@/assets/imgwx/new/img_tag1.png" alt="" />
          <p>研讨主题</p>
          <p>{{ characterDetail.theme }}</p>
        </div>
      </div>
      <div class="brief">
        <img src="@/assets/imgwx/new/title1.png" alt="" />
      </div>
      <div class="brief_des">
        <p v-for="(x, index) in characterBriefList" :key="'first' + index">
          {{ x }}
        </p>
      </div>
      <div class="brief">
        <img src="@/assets/imgwx/new/title2.png" alt="" />
      </div>
      <div class="brief_des">
          <p v-for="(x, index) in characterContentList" :key="index">{{ x }}</p>
      </div>
      <div class="brief">
        <img src="@/assets/imgwx/new/title3.png" alt="" />
      </div>
      <div class="brief_des">
        <ul>
          <li
           v-for="(x, index) in presonList"
              :key="'person' + index"
              @click="toDetail(x)">
            <div class="cover">
              <img :src="x.ocCover" alt="">
            </div>
            <h3>{{ x.ocName }}</h3>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Data from '@/data/staticData'
import shareBack from './components/shareAndback'
import navBar from './components/navigatonBar'
import QRCode from 'qrcodejs2'
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
      qrcodeFlag: false,
      ocCode: this.$route.params.ocCode,
      characterDetail: {},
      url: window.location.href,
      characterBriefList: [],
      characterContentList: [],
      presonList: [],
      Data: {
        character: {}
      }
    }
  },
  methods: {
    toDetail(x) {
      this.$router.push({
        name: 'picshow_detail',
        params: {
          ocCode: x.ocCode
        }
      })
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
    getPersonDetail() {
      const _this = this
      const params = {}
      params.status = 1
      params.operateCode = 'c0612dbe-b2ec-11eb-8ecb-b8599f37e6f0'
      params.ocWrite = this.ocCode
      this.$apis.getList(params).then((res) => {
        _this.presonList = res.data.data.list
        console.log(_this.presonList)
      })
    }
  },
  mounted() {
    this.Data = Data
    this.getPersonDetail()
    this.characterDetail = this.Data.character[this.ocCode]
    this.characterBriefList = this.characterDetail.brief.split('@kada')
    this.characterContentList = this.characterDetail.content.split('@kada')
  }
}
</script>
<style lang="scss" scoped>
.code2 {
  position: absolute;
  width: 100px;
  height: 100px;
  right: 70px;
  top: -20px;
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
  .wx_character_detail{
    background-color: #F7EEDD;
    padding: 0.29rem 0.26rem 0;
    position: absolute;
    width: 100%;
    // height: 100vh;
    // height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    .top{
      // display: flex;
      .cover{
        float: left;
        width: 2.2rem;
        height: 2.2rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .des{
        width: 4.3rem;
        float: left;
        margin-left: 0.36rem;
        h3{
          font-size: 0.38rem;
          font-family: PingFang SC;
          font-weight: bold;
          color: #333333;
        }
        img{
          margin-top: 0.24rem;
          display: block;
          width: 0.22rem;
          height: 0.19rem;
        }
        p{
          margin-top: 0.21rem;
          line-height: 0.35rem;
        }
      }
    }
    .brief{
      margin-top: 0.27rem;
      width: 1.97rem;
      height: 0.5rem;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .brief_des{
      margin-top: 0.35rem;
      p{
        font-size: 0.28rem;
        text-align: justify;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
        line-height: 0.48rem;
      }
      ul{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        li{
          width: 48%;
          margin-bottom: 0.2rem;

          .cover{
            width: 100%;
            height: 2.12rem;
            img{
              width: 100%;
              height: 100%;
            }
          }
          h3{
            margin-top: 0.28rem;
            font-size: 0.28rem;
            font-family: PingFang SC;
            font-weight: 500;
            color: #333333;
          }
        }
      }
    }
  }
</style>
