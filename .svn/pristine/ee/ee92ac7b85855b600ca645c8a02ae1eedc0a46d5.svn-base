<template>
  <div class="whole">
    <div class="kada_pc_picshow" v-if="!isMobile">
      <div class="bg_header"></div>
      <div class="pic_bg">
        <div class="act-container">
           <div class="kada_title_zj">
            <img src="@/assets/img/pc/img_title4.png" alt="" />
          </div>
          <div class="boder">
            <div class="picshow" style="padding-top:30px">
            <div class="search_sort clearfix">
              <div class="l">
                <ul class="clearfix">
                  <li>排序：</li>
                  <li
                    :class="{ active: searchSort == 3 }"
                    @click="changeSearchSort(3)"
                  >
                    全部
                  </li>
                  <li
                    :class="{ active: searchSort == 0 }"
                    @click="changeSearchSort(0)"
                  >
                    红色经典
                  </li>
                   <li
                    :class="{ active: searchSort == 2 }"
                    @click="changeSearchSort(2)"
                  >
                    青年作品
                  </li>

                </ul>
              </div>
              <div class="r">
                <input
                  type="text"
                  placeholder="请输入关键字检索"
                  v-model="ocName"
                /><button @click="search()">搜索</button>
              </div>
            </div>
            <ul class="clearfix">
              <li
                v-for="(one, index) in pictureList"
                :key="index"
                @click="toDetail(one.ocCode)"
              >
                <div class="pic">
                  <img :src="one.ocCover" alt="" />
                </div>
                <div class="title ">
                  <h3>{{ one.ocName |substr(10)}}</h3>
                  <div class="status clearfix">
                    <span>{{one.ocWrite}}</span>
                  </div>
                </div>
              </li>
            </ul>
            <!-- <div class="kada_more">查看更多</div> -->
            <div class="pages" style="padding-top: 51px">
              <pagination
                :total="total"
                :page.sync="currentPage"
                :limit.sync="pageSize"
                @pagination="changePage"
              />
            </div>
          </div>
          </div>
        </div>
      </div>
       <navBar :url='url'></navBar>
    </div>
    <div class="kada_wx_picshow" v-if="isMobile">
      <!-- <div class="headerbg"></div> -->
      <div class="kada_list">
        <div class="pic_cont">
          <img src="@/assets/imgwx/new/img_title2.png" alt="" />
        </div>
         <!--线上宣讲  -->
        <div class="bor">
          <div class="boder">
          <div class="n_boder">
            <div class="search">
          <input
            type="text"
            placeholder="输入关键字检索（所有作品信息）"
            v-model="ocName"
            @change="search()"
          />
        </div>
             <div class="sort clearfix" style="margin-top: 0.2rem">
                <ul class="clearfix">
                  <li>排序：</li>
                     <li
                    :class="{ active: searchSort == 3 }"
                    @click="changeSearchSort(3)"
                  >
                    热度
                  </li>
                  <li
                    :class="{ active: searchSort == 0 }"
                    @click="changeSearchSort(0)"
                  >
                    编号
                  </li>

                </ul>
              </div>
               <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="searchwx()"
              >
              <ul class="clearfix listt">
                <li
                  v-for="(one, index) in pictureList"
                  :key="index"
                  @click="toDetail(one.ocCode)"
                >
                  <div
                    class="pic"
                    :style="{ backgroundImage: 'url(' + one.ocCover + ')' }"
                    style="background-position: center; background-size: cover"
                  >
                  </div>
                  <div class="tit">
                    <h3>{{ one.ocName | substr(8) }}</h3>
                    <p>
                      宣讲员：{{ one.ocComposingWords | substr(6) }}
                    </p>
                    <span>{{one.ocVote}}</span>
                    <div class="status" v-if="one.opStatus==0">
                      <!-- <div class="img">
                        <img src="@/assets/imgwx/ic_party.png" alt="">
                      </div> -->
                      <p style="line-height: 0.6rem;">未开始</p>
                    </div>
                    <div class="status" v-if="one.opStatus==1 && one.flag == 0" @click.stop="vote(one)">
                      <!-- <div class="img">
                        <img src="@/assets/imgwx/ic_party.png" alt="">
                      </div> -->
                      <p style="line-height: 0.6rem;">请您听宣讲</p>
                    </div>
                    <div class="status" v-if="one.opStatus==1 && one.flag == 1" @click.stop="hasVoted()">
                      <!-- <div class="img">
                        <img src="@/assets/imgwx/ic_party.png" alt="">
                      </div> -->
                      <p style="line-height: 0.6rem;">请您听宣讲</p>
                    </div>
                    <div class="status" v-if="one.opStatus==2">
                      <!-- <div class="img">
                        <img src="@/assets/imgwx/ic_party.png" alt="">
                      </div> -->
                      <p style="line-height: 0.6rem;">已结束</p>
                    </div>
                  </div>
                  <div class="number">{{ one.ocNumber }}</div>
                </li>
              </ul>
               </van-list>
          </div>
        </div>
       </div>

      </div>
      <!-- backhome -->
      <div class="back_home" @click="back('/')">
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
  </div>
</template>
<script>
import navBar from './components/navigatonBar'
import QRCode from 'qrcodejs2'
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
export default {
  components: {
    Pagination,
    navBar
  },
  computed: {
    ...mapGetters(['isMobile', 'userInfo'])
  },
  data() {
    return {
      qrcodeFlag: false,
      ocName: '',
      total: 0,
      pageSize: 15,
      currentPage: 1,
      pictureList: [],
      searchSort: 3,
      finished: false,
      loading: false,
      url: window.location.href
    }
  },
  methods: {
    vote(item) {
      // 判断是否登录
      console.log('userInfo', this.userInfo)
      if (!this.userInfo) {
        if (this.isMobile) {
          this.$dialog.confirm({
            title: '提示',
            message: '您还未登录，立即去登录?',
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$store.commit('SET_BACKROUTER', `${this.$route.fullPath}`)
            this.$router.push({ path: '/login' })
          }).catch(() => {
            // on cancel
          })
        } else {
          this.$confirm('您还未登录，立即去登录?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$store.commit('SET_LOGINSTATE', true)
          }).catch(() => {

          })
        }
      } else {
        const params = {}
        const _this = this
        // 防止重复提交
        if (!this.flag) {
          this.flag = true
          params.ocCode = item.ocCode
          params.opClientType = 'CLIENT_WX'
          params.operateCode = 'c0612dbe-b2ec-11eb-8ecb-b8599f37e6f0'
          this.$apis.userVote(params).then((res) => {
            if (res.data.status.returnCode === 100) {
              _this.flag = false
              _this.$toast.success('送党徽成功')
              item.ocVote++
              if (!res.data.data.list[0]) {
                item.flag = 0
              } else {
                item.flag = 1
              }
              return
            }
            if (res.data.status.returnCode === 354) {
              _this.$toast.fail('未到送党徽时间段')
              _this.flag = false
            } else {
              _this.$toast.fail('送党徽失败，请稍后操作')
              _this.flag = false
            }
          })
        }
      }
    },
    insertRead() {
      // const _this = this
      const params = {}
      params.visitTitle = '浙江省红色主题雕塑大展'
      this.$apis.insertVistor(params).then((res) => {
      })
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
    search() {
      this.list = []
      this.currentPage = 1
      this.finished = false
      this.getPictureList()
    },
    changePage(val) {
      // window.sessionStorage.setItem('pageVal', val)
      this.currentPage = val.page
      this.pictureList = []
      this.getPictureList()
    },
    searchwx() {
      this.list = []
      this.finished = false
      this.getPictureList()
    },
    changeSearchSort(num) {
      this.searchSort = num
      this.currentPage = 1
      this.pictureList = []
      this.getPictureList()
    },
    getPictureList() {
      const _this = this
      const params = {}
      if (_this.isMobile) {
        _this.loading = true
      }
      params.status = 1
      params.operateCode = 'c0612dbe-b2ec-11eb-8ecb-b8599f37e6f0'
      params.pageSize = 15
      params.ocName = _this.ocName
      params.pageNum = _this.currentPage
      params.searchSort = this.searchSort
      this.$apis.getList(params).then((res) => {
        if (_this.isMobile) {
          // 加载状态结束
          _this.loading = false
          _this.currentPage++
          if (_this.pictureList.length === 0) {
            _this.pictureList = res.data.data.list
          } else {
            _this.pictureList = _this.pictureList.concat(res.data.data.list)
          }
          // 数据全部加载完成
          if (res.data.data.page.curPage === res.data.data.page.totalPage) {
            _this.finished = true
          }
        } else {
          _this.pictureList = res.data.data.list
          _this.total = res.data.data.page.totalRow
        }

        console.log(_this.pictureList)
      })
    },
    toDetail(ocCode) {
      this.$router.push({
        name: 'picshow_detail',
        params: {
          ocCode: ocCode
        }
      })
    }
  },
  mounted() {
    if (!this.isMobile) {
      this.getPictureList()
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
.song {
  width: 100%;
  margin-top: 10px;
  height: 36px;
  // padding-left: 80px;
  background: #de1c07;
  border-radius: 4px;
  img {
    margin-top: 8px;
    float: left!important;
  }
  p {
    // float: left;
    // margin-left: 10px;
    text-align: center;
    line-height: 36px!important;
    // margin-top: 7px !important;
    font-size: 14px !important;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #fff9e1 !important;
  }
}
.aaaa{
  text-align: center;
  font-size: 20px!important;
  font-family: Microsoft YaHei;
  font-weight: 600!important;
  color: #DE1C07!important;
}
</style>

