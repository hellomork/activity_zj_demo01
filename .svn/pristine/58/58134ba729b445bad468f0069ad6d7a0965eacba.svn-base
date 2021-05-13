<template>
  <div class="listright">

    <div class="smallshare">
      <!-- share -->
      <div class="share" @mouseover="showQrcode()" @mouseout="hideQrcode">
        <img src="@/assets/img/share.png" alt />
        <p>微信分享</p>
      </div>
      <div id="code" class="code" v-show="qrcodeFlag">
          <div id="qrcode" class="qrcode" ref="qrcode"></div>
        </div>
      <!-- backtop -->
      <div v-if="gotop" class="backtop" @click="goUp">
        <img src="@/assets/img/backtop.png" alt />
        <p>返回顶部</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import QRCode from 'qrcodejs2'
export default {
  props: {
    url: {
      type: String
    }
  },
  name: '',
  computed: {
    ...mapGetters(['userInfo', 'isMobile'])
  },
  data() {
    return {
      qrcodeFlag: false,
      gotop: false
    }
  },
  methods: {
    toPath(path) {
      this.$router.push({ path: path })
    },
    handleScroll() {
      const scrolltop =
        document.documentElement.scrollTop || document.body.scrollTop
      scrolltop > 700 ? (this.gotop = true) : (this.gotop = false)
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
        width: 70,
        height: 70,
        text: text, // 二维码地址
        colorDark: '#000',
        colorLight: '#fff'
      })
    },
    toPublish() {
      if (!this.userInfo) {
        this.$confirm('投稿需要登录，立即去登录', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          /*
            参数说明：
            userType：PCWOPERATE / WXOPERATE
            preUrl： 当前页面地址,,注册页面地址
            optype：TOUGAO / TOUPIAO
          */
          window.location.href = window.location.origin + '/users/getAuthorizeCode.login?preurl=' + window.location.href + ',,' + window.location.origin + '/20videos/register' + '&userType=PCWOPERATE&optype=TOUGAO'
          // this.$router.push({
          //   path: '/articlecontribute'
          // })
        })
      } else {
        if (!this.userInfo.mobile) {
          this.$router.push({
            path: '/register'
          })
        } else {
          this.$router.push({
            path: '/articlecontribute'
          })
        }
      }
    },
    myWork() {
      if (!this.userInfo) {
        this.$confirm('查看作品需要登录，立即去登录', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          /*
            参数说明：
            userType：PCWOPERATE / WXOPERATE
            preUrl： 当前页面地址,,注册页面地址
            optype：TOUGAO / TOUPIAO
          */
          window.location.href = window.location.origin + '/users/getAuthorizeCode.login?preurl=' + window.location.href + ',,' + window.location.origin + '/20videos/register' + '&userType=PCWOPERATE&optype=TOUGAO'
          // this.$router.push({
          //   path: '/articlecontribute'
          // })
        })
      } else {
        // 判断是否有手机号
        if (!this.userInfo.mobile) {
          this.$router.push({
            path: '/register'
          })
        } else {
          this.$router.push({
            path: '/mypicshow'
          })
        }
      }
    }
  },
  mounted() {
    // 此处true需要加上，不加滚动事件可能绑定不成功
    window.addEventListener('scroll', this.handleScroll, true)
  }
}
</script>
<style lang="scss" scoped>
.listright {
  position: fixed;
  right: 143px;
  // bottom: 125px;
  top: 50%;
  transform: translateY(-50%);
  // width: 245px;
  height: 168px;
  z-index: 99;
}
.smallshare{
  margin-top: 50px;
  text-align: center;
  margin-left: 50px;
  position: relative;
  .code {
    position: absolute;
    width: 74px;
    height: 74px;
    left: -80px;
    top: 0px;
    padding: 2px;
    background-color: #ffffff;
    .qrcode {
          width: 70px;
      height: 70px;
      position: relative;
    }
  }
}
.share {
  // position: absolute;
  // top: 122px;
  // right: 95px;
  width: 74px;
  height: 74px;
  cursor: pointer;
  background-color: #D92318;
  padding-top: 5px;
  >img{
    width: auto;
    height: 40px;
  }
  >p{
    font-size: 14px;
    text-align: center;
    color: #fff;
  }
}

.backtop {
  // position: absolute;
  // top: 216px;
  // right: 95px;
  margin-top: 20px;
  width: 74px;
  height: 74px;
  cursor: pointer;
  padding-top: 10px;
  background-color: #D92318;
  >img{
    width: auto;
    height: 30px;
  }
  >p{
    font-size: 14px;
    text-align: center;
    color: #fff;
  }
}

.send {
  width: 170px;
  height: 190px;
  background: url("../../../assets/img/2320.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
  overflow: hidden;
  // top: 165px;
  // right: 40px;
  text-align: center;
  z-index: 10;

  .first-send {
    margin-top: 10px;
    width: 110px;
    cursor: pointer;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    height: 80px;
    background: #000000;

    p {
      line-height: 80px;
      color: #ffffff;
    }
  }

  .second-send {
    margin-top: 10px;
    position: relative;
    cursor: pointer;
    left: 50%;
    transform: translateX(-50%);
    width: 110px;
    height: 80px;
    background: #000000;

    p {
      line-height: 80px;
      color: #ffffff;
    }
  }
}

.act-time {
  width: 170px;
  height: 280px;
  background: rgba(51, 51, 51, 1);
  text-align: center;
  // position: relative;
  // z-index: 10;
  // top: 210px;
  // right: 40px;

  ul {
    margin-top: 24px;
     overflow: hidden;
    li {

      margin-top: 24px;

      h4 {
        font-size: 16px;

        line-height: 19px;
        color: #ffffff;
      }

      p {
        font-size: 14px;
        line-height: 19px;
        color: #ffffff;
      }

      &:first-child {
        margin-top: 25px;
      }
    }
  }
}
</style>
