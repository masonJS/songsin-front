<template>
  <div id="news" v-if="newsList.length !== 0">
    <ul>
      <li v-for="(news, index) in newsList" :key="index">
        <img :src="news.img === 'http:undefined' ? 'http://img.yonhapnews.co.kr/basic/svc/00_ko/home/logo_yna_170x59_01.png' : news.img">
        <div class="news_text">
          <p class="title">{{ news.title }}</p>
          <p class="description">{{ news.description }}</p>
        </div>
      </li>
    </ul>
    <div class="oli_logo"><img src="https://songsin-resource.s3.ap-northeast-2.amazonaws.com/image/common/oli_logo.png"></div>
  </div>
</template>

<script>
  import { SONGSIN } from '@/api'
  import { eventBus } from "../utils/event";
  import { go } from 'ffp-js'
  export default {
    name: "News",
    data() {
      return {
        newsList: []
      }
    },
    created() {
      eventBus.$emit('change:background', this.$route.path)
      this.$emit('on:progress')
      this.fetchNews()
      this.$emit('off:progress')
    },
    methods:{
      fetchNews() {
        return go(
          SONGSIN.getNewsTopic(),
          ({data}) => data,
          list => list.filter((_, index) => index< 5),
          list => (this.newsList = list)
        )
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/style/mixin.scss';

  #news {
    @include position($p: absolute, $t:7%, $l: 27%);
    @include box($w: 70rem, $h:53rem, $border: 1px solid #eaecef);
    box-shadow: 1px 12px 15px rgba(0,0,0,.1);
    background-color: rgba(242, 248, 248, 0.72);
    li{
      height: 10rem;
      padding: 0.5rem 1rem;
      img{
        position: relative;
        width: 13rem;
        height: 100%;
        float: left
      }
      .news_text{
        padding-left: 15rem;
        padding-top: 0.3rem;
        .title{
          font-size: 2rem;
        }
        .description{
          padding-top: 1rem;
          font-size: 1.3rem;
        }
      }
    }
    .oli_logo{
      position: fixed;
      top: 51rem;
      left: 97rem;
    }
  }

</style>
