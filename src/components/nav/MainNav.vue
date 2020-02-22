<template>
  <ul id="nav_list" v-if="styleList.length">
    <li v-for="(nav, index) in navList" :key="index" :style="{ 'background': styleList[index].background }">
      <router-link :to="nav.path">
        <!--<img :src=nav.image>-->
        <div class="text" :style="{ 'color': styleList[index].color }">{{ nav.text }}</div>
      </router-link>
    </li>
    <li :style="{ 'background': settingStyle.background }">
      <a @click='goSetting'>
        <!--<img :src="navAdmin.image">-->
        <div class="text" :style="{ 'color': settingStyle.color }">{{ navAdmin.text }}</div>
      </a>
    </li>
  </ul>
</template>

<script>
import { eventBus } from "../../utils/event";
import { match } from 'ffp-js'
export default {
  name: "Main",
  data() {
    return {
      timer: null,
      navList: [
        { path: '/weather', image:'https://songsin-resource.s3.ap-northeast-2.amazonaws.com/image/cloud.png', text:'날씨'},
        { path: '/notice', image:'https://songsin-resource.s3.ap-northeast-2.amazonaws.com/image/megaphone.png', text:'공지'},
        { path: '/birth_notice', image:'https://songsin-resource.s3.ap-northeast-2.amazonaws.com/image/cake.png', text:'축일자'},
        { path: '/news', image:'https://songsin-resource.s3.ap-northeast-2.amazonaws.com/image/news.png', text:'뉴스'},
        ],
      styleList: [],
      settingStyle: { background: null, color: null },
      navAdmin: {
        path: '/setting',
        image:'https://songsin-resource.s3.ap-northeast-2.amazonaws.com/image/gear.png',
        text:'설정'
      }
    }
  },
  created() {
     this.routing(this.$route.path)
    eventBus.$on('change:background', path => {
      this.routing(path)
    })
  },
  mounted() {
    this.setSlider()
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    setSlider(time = 15000) {
      let count = 1
      this.timer = setInterval(() => {
        (this.navList.length <= count) && (count = 0);
        this.$router.push(this.navList[count].path)
        count++
      }, time)
    },
    goSetting(){
      clearInterval(this.timer)
      this.$router.push(this.navAdmin.path)
    },
    routing(path) {
      return match(path)
        .case(path => path === '/weather')
        (
          _ => (this.styleList = [
            { background: '#cfb7bb', color: '#7c5d25'},
            { background: '#d3e3d7', color: '#7c5d25'},
            { background: '#9ad0d6', color: '#7c5d25'},
            { background: '#abaede', color: '#7c5d25'}
          ]),
          _ => (this.settingStyle = ({ background: '#70b9e4', color: '#7c5d25' }))
        )
        .case(path => path === '/notice')
        (
          _ => (this.styleList = [
            { background: '#acdb71', color: '#588803'},
            { background: '#e2ee65', color: '#588803'},
            { background: '#feef39', color: '#588803'},
            { background: '#b39eeb', color: '#e0efbc'}
          ]),
          _ => (this.settingStyle = ({ background: '#f7fdd0', color: '#588803' }))
        )
        .case(path => path === '/birth_notice')
        (
          _ => (this.styleList = [
            { background: '#f35536', color: '#ffd9e3'},
            { background: '#ffa2ab', color: '#fb3f3d'},
            { background: '#fad0c4', color: '#fb3f3d'},
            { background: '#fce2a1', color: '#fb3f3d'}
          ]),
          _ => (this.settingStyle = ({ background: '#eeb353', color: '#fb3f3d' }))
        )
        .case(path => path === '/news')
        (
          _ => (this.styleList = [
            { background: '#95c8dd', color: '#084993'},
            { background: '#b4deef', color: '#084993'},
            { background: '#e5eff0', color: '#084993'},
            { background: '#509ec2', color: '#084993'}
          ]),
          _ => (this.settingStyle = ({ background: '#084993', color: '#b4deef' }))
        )
        .else(_ => _)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/navigation.scss';

</style>
