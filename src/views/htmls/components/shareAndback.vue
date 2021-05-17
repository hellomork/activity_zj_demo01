<template>
  <div>
        <!-- backhome -->
      <div class="back_home" style="bottom: 9rem" @click="back('/')">
        <img src="@/assets/imgwx/backlogo.png" alt="">
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
</template>
<script>
export default {
  data() {
    return {
      qrcodeFlag: false
    }
  },
  methods: {
    toTo() {
      window.scrollTo(0, 0)
    },
    back() {
      this.$router.push({ path: '/' })
    },
    shareAlert() {
      document.getElementById('hom-sharewraper').style.display = 'block'
    },
    closedAlert() {
      document.getElementById('hom-sharewraper').style.display = 'none'
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
</style>
