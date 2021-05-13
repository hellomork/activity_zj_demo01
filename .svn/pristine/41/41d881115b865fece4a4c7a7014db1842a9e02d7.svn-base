<template>
     <div class="headerbg">
      <div class="fix1" @click="show=true">
        <img src="@/assets/imgwx/share.png" alt />
      </div>
      <div v-if="gotop" class="fix2" @click="goUp">
        <img src="@/assets/imgwx/ic_top.png" alt />
        <p>返回顶部</p>
      </div>
      <!-- 分享提示 -->
      <van-overlay :show="show" @click.stop="show = false" :z-index="99">
        <div class="sharewraper">
          <img src="@/assets/imgwx/share-alert.png"/>
        </div>
      </van-overlay>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['userInfo', 'isMobile'])
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 1.69,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: true
        }
      },
      allData: {},
      show: false,
      gotop: false
    }
  },
  methods: {
    publish() {
      if (this.userInfo === null || this.userInfo === undefined) {
        this.$dialog.confirm({
          title: '提示信息',
          message: '您还未登录，请先登录',
          confirmButtonText: '登录'
        }).then(() => {
          window.location.href = window.location.origin + '/users/getAuthorizeCode.login?preurl=' + window.location.href + ',,' + window.location.origin + '/20videos/register' + '&userType=WXOPERATE&optype=TOUGAO'
        }).catch(() => {
          // on cancel
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
    getTotalData() {
      const _this = this
      const params = {}
      params.operateCode = this.$store.state.app.operateCode
      this.$apis.getAllData(params).then(res => {
        _this.allData = res.data.data.list[0]
      })
    },
    myWork() {
      if (!this.userInfo) {
        this.$dialog.confirm({
          title: '提示',
          message: '查看作品需要登录，立即去登录',
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
          window.location.href = window.location.origin + '/users/getAuthorizeCode.login?preurl=' + window.location.href + ',,' + window.location.origin + '/20videos/register' + '&userType=WXOPERATE&optype=TOUGAO'
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
    }
  },
  created() {
    // this.getTotalData()
  },
  mounted() {
    // 此处true需要加上，不加滚动事件可能绑定不成功
    window.addEventListener('scroll', this.handleScroll, true)
  }
}
</script>
