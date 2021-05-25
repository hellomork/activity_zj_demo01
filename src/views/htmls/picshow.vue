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
                  <li>类别：</li>
                  <li
                    :class="{ active: teamCode == null }"
                    @click="changeSearchSort(null)"
                  >
                    全部
                  </li>
                  <li
                    :class="{ active: teamCode == '红色经典' }"
                    @click="changeSearchSort('红色经典')"
                  >
                    红色经典
                  </li>
                   <li
                    :class="{ active: teamCode == '青年作品' }"
                    @click="changeSearchSort('青年作品')"
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
          <img src="@/assets/imgwx/new/img_title3.png" alt="" />
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
                  <li>类别：</li>
                    <li
                    :class="{ active: teamCode == null }"
                    @click="changeSearchSort(null)"
                  >
                    全部
                  </li>
                  <li
                    :class="{ active: teamCode == '红色经典' }"
                    @click="changeSearchSort('红色经典')"
                  >
                    红色经典
                  </li>
                   <li
                    :class="{ active: teamCode == '青年作品' }"
                    @click="changeSearchSort('青年作品')"
                  >
                    青年作品
                  </li>

                </ul>
              </div>
               <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="getPictureList()"
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
                      专家：{{ one.ocWrite | substr(6) }}
                    </p>
                    <!-- <span>{{one.ocVote}}</span> -->
                    <!-- <div class="status" v-if="one.opStatus==0">
                      <p style="line-height: 0.6rem;">未开始</p>
                    </div>
                    <div class="status" v-if="one.opStatus==1 && one.flag == 0" @click.stop="vote(one)">
                      <p style="line-height: 0.6rem;">请您听宣讲</p>
                    </div>
                    <div class="status" v-if="one.opStatus==1 && one.flag == 1" @click.stop="hasVoted()">
                      <p style="line-height: 0.6rem;">请您听宣讲</p>
                    </div>
                    <div class="status" v-if="one.opStatus==2">
                      <p style="line-height: 0.6rem;">已结束</p>
                    </div> -->
                  </div>
                  <!-- <div class="number">{{ one.ocNumber }}</div> -->
                </li>
              </ul>
               </van-list>
          </div>
        </div>
       </div>

      </div>
      <shareBack></shareBack>

    </div>
  </div>
</template>
<script>
import navBar from './components/navigatonBar'
import shareBack from './components/shareAndback'
import QRCode from 'qrcodejs2'
import wxService from '@/api/wxService'
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
var imgURrl = require('@/assets/imgwx/shareicon.png')
export default {
  components: {
    Pagination,
    navBar,
    shareBack
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
      teamCode: null,
      finished: false,
      loading: false,
      url: window.location.href
    }
  },
  methods: {
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
      this.pictureList = []
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
    changeSearchSort(num) {
      this.teamCode = num
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
      params.teamCode = _this.teamCode
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
    } else {
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

