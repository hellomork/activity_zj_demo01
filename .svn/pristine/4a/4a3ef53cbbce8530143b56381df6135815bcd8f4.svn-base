<template>
  <div id="app">
    <login @changeFlag="hideDialog" @forgetPsw="forgetPsw" @register="register"/>
    <register :dialogVisible="registerFlag"  @changeFlag="hideDialog"/>
    <findPsw  :dialogVisible="fFlag" @changeFlag="hideDialog"/>
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import login from '@/components/layout/login'
import register from '@/components/layout/register'
import findPsw from '@/components/layout/find'
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },
  computed: {
    ...mapGetters(['loginFlag', 'registerFlag']),
    hideFlag() {
      return this.$route.meta.hideFlag
    }
  },
  components: {
    login,
    register,
    findPsw
  },
  data() {
    return {
      isRouterAlive: true,
      fFlag: false,
      IE_VERSION: false
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    },
    hideDialog() {
      this.$store.commit('SET_LOGINSTATE', false)
      this.$store.commit('SET_REGISTERSTATE', false)
      this.fFlag = false
    },
    forgetPsw() {
      this.$store.commit('SET_LOGINSTATE', false)
      setTimeout(() => {
        this.fFlag = true
      }, 300)
    },
    register() {
      this.$store.commit('SET_LOGINSTATE', false)
      setTimeout(() => {
        this.$store.commit('SET_REGISTERSTATE', true)
      }, 300)
    }
  },
  mounted() {
    
  },
}
</script>

