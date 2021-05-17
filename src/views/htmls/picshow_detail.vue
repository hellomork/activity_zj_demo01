<template>
  <div>
    <div class="picshow_detail" v-if="!isMobile">
      <div class="pic_head">
        <div class="act-container">
          <h3>浙江省喜迎建党百年红色主题雕塑展</h3>
        </div>
      </div>
      <div class="act-container pic_center clearfix">
        <div class="l">
          <div class="des clearfix">
            <h3>{{ detail.ocName }}</h3>
            <span
              >{{ detail.ocComposingWords }} {{ detail.ocComposingMusic }}</span
            >
          </div>
          <div class="imgPic">
            <img :src="detail.ocCover" alt="" />
          </div>
          <div class="title">
            <p v-for="(x, index) in kadaDesList" :key="index">{{ x }}</p>
          </div>
        </div>
        <div class="r" >
          <div class="img" @click="toDetail(detail)">
            <img :src="characterCover" alt="" />
          </div>
          <h3>{{ detail.ocWrite }}</h3>
          <p>{{ characterTheme }}</p>
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
      </div>
      <navBar :url="url"></navBar>
    </div>
    <div class="wx_picshow_detail" v-if="isMobile">
      <h3>{{ detail.ocName }}</h3>
      <p>{{ detail.ocComposingWords }} {{ detail.ocComposingMusic }}</p>
      <div class="describe clearfix"  @click="toDetail(detail)">
        <div class="l" >
          <img :src="characterCover" alt="" />
        </div>
        <div class="c">
          <h4>{{ detail.ocWrite }}</h4>
          <span>{{ characterTheme }}</span>
        </div>
        <div class="icon">
          <img src="@/assets/imgwx/new/img_tag.png" alt="" />
        </div>
      </div>
      <div class="cover">
        <img :src="detail.ocCover" alt="" />
      </div>
      <div class="title">
         <p v-for="(x, index) in kadaDesList" :key="index">{{ x }}</p>
      </div>
        <shareBack></shareBack>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import QRCode from 'qrcodejs2'
import shareBack from './components/shareAndback'
import navBar from './components/navigatonBar'
import Data from '@/data/staticData'
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
      detail: '',
      kadaDesList: [],
      Data: {
        character: {}
      },
      characterCover: '',
      characterTheme: '',
      qrcodeFlag: false,
      ocCode: this.$route.params.ocCode,
      url: window.location.href
    }
  },
  methods: {
    toDetail(x) {
      this.$router.push({
        name: 'character_detail',
        params: {
          ocCode: x.ocWrite
        }
      })
    },
    getDetail() {
      const _this = this
      const params = {}
      params.status = 1
      params.operateCode = 'c0612dbe-b2ec-11eb-8ecb-b8599f37e6f0'
      params.ocCode = this.ocCode
      this.$apis.getList(params).then((res) => {
        _this.detail = res.data.data.list[0]
        _this.kadaDesList = _this.detail.content.split('@kada')
        _this.characterCover = this.Data.character[_this.detail.ocWrite].cover
        _this.characterTheme = this.Data.character[_this.detail.ocWrite].theme
        console.log(_this.detail)
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
    }
  },
  mounted() {
    this.getDetail()
    this.Data = Data
  }
}
</script>
<style lang="scss" scoped>
.code2 {
  position: absolute;
  width: 100px;
  height: 100px;
  left: 75px;
  top: 395px;
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
.wx_picshow_detail{
    background-color: #F7EEDD;
    padding: 0.29rem 0.26rem 0;
    // position: absolute;
    width: 100%;
    // height: 100vh;
    // height: 100%;
    // top: 0;
    // bottom: 0;
    // left: 0;
    h3{
      font-size: 0.38rem;
      font-family: PingFang SC;
      font-weight: bold;
      color: #333333;
    }
    >p{
      margin-top: 0.19rem;
      font-size: 0.28rem;
      font-family: PingFang SC;
      font-weight: 500;
      color: #666666;
    }
    .describe{
      margin-top: 0.31rem;
      background-color: #FDF4E4;
      padding: 0.05rem;
      // display: flex;

      .l{
        float: left;
        width: 1.3rem;
        height: 1.3rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .c{
        float: left;
        margin-left: 0.21rem;
        h4{
          font-size: 0.3rem;
          font-family: PingFang SC;
          font-weight: bold;
          color: #333333;
          margin-bottom: 0.33rem;
        }
        span{
          font-size: 0.24rem;
          font-family: PingFang SC;
          font-weight: 500;
          color: #666666;
        }
      }
      .icon{
        float: right;
        width: 0.29rem;
        height: 0.26rem;
        margin-top: 0.04rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    .cover{
      margin-top: 0.25rem;
      width: 100%;
      height: 4.35rem;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .title{
      margin-top: 0.31rem;
      p{
        font-size: 0.28rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
        line-height: 0.48rem;
      }
    }
  }
</style>
