<template>
  <ul id="nav_list" v-if="styleList.length">
    <li v-for="(nav, index) in navList" :key="index" :style="{ 'background': styleList[index].background }">
      <router-link :to="nav.path">
        <!--<img :src=nav.image>-->
        <div class="text" :style="{ 'color': styleList[index].color }">{{ nav.text }}</div>
      </router-link>
    </li>
    <li :style="{ 'background': settingStyle.background }"
        @mouseover="mouseOver"
        @mouseleave="mouseLeave"
    >
      <a @click='goSetting' v-if="isSetting">
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
        { path: '/sport_news', image:'https://songsin-resource.s3.ap-northeast-2.amazonaws.com/image/news.png', text:'스포츠'},
        ],
      styleList: [],
      settingStyle: { background: null, color: null },
      navAdmin: {
        path: '/setting',
        image:'https://songsin-resource.s3.ap-northeast-2.amazonaws.com/image/gear.png',
        text:'설정'
      },
      isSetting: false
    }
  },
  created() {
     this.routing(this.$route.path)
    eventBus.$on('change:background', path => {
      this.routing(path)
    })
  },
  mounted() {
    // this.setSlider()
  },
  beforeDestroy() {
    // clearInterval(this.timer)
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
    mouseOver() {
      this.isSetting = true
    },
    mouseLeave() {
      this.isSetting = false
    },
    routing(path) {
      return match(path)
        .case(path => path === '/weather')
        (
          _ => (this.styleList = [
            { background: '#cfb7bb', color: '#fdfdfd'},
            { background: '#d3e3d7', color: '#7c5d25'},
            { background: '#9ad0d6', color: '#7c5d25'},
            { background: '#abaede', color: '#7c5d25'},
            { background: '#70b9e4', color: '#7c5d25'},
          ]),
          _ => (this.settingStyle = ({ background: '#649ccc', color: '#7c5d25' }))
        )
        .case(path => path === '/notice')
        (
          _ => (this.styleList = [
            { background: '#acdb71', color: '#fdfdfd'},
            { background: '#e2ee65', color: '#588803'},
            { background: '#feef39', color: '#fdfdfd'},
            { background: '#b39eeb', color: '#fdfdfd'},
            { background: '#5c4794', color: '#fdfdfd'},
          ]),
          _ => (this.settingStyle = ({ background: '#497318', color: '#fdfdfd' }))
        )
        .case(path => path === '/birth_notice')
        (
          _ => (this.styleList = [
            { background: '#f35536', color: '#ffd9e3'},
            { background: '#ffa2ab', color: '#fb3f3d'},
            { background: '#fad0c4', color: '#fb3f3d'},
            { background: '#fce2a1', color: '#fb3f3d'},
            { background: '#eeb353', color: '#fb3f3d'},
          ]),
          _ => (this.settingStyle = ({ background: '#f2c273', color: '#fb3f3d' }))
        )
        .case(path => path === '/news')
        (
          _ => (this.styleList = [
            { background: '#95c8dd', color: '#084993'},
            { background: '#b4deef', color: '#084993'},
            { background: '#e5eff0', color: '#084993'},
            { background: '#333399', color: '#d0edf8'},
            { background: '#36a3e0', color: '#084993'},
          ]),
          _ => (this.settingStyle = ({ background: '#66d9c2', color: '#b4deef' }))
        )
        .case(path => path === '/sport_news')
        (
          _ => (this.styleList = [
            { background: '#a2e7fc', color: '#77503e'},
            { background: '#e2ee65', color: '#77503e'},
            { background: '#feec95', color: '#77503e'},
            { background: '#fec587', color: '#77503e'},
            { background: '#fe5b5b', color: '#ffef99'},
          ]),
          _ => (this.settingStyle = ({ background: '#6ba7fe', color: '#77503e' }))
        )
        .else(_ => _)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/navigation.scss';
</style>
