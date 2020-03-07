<template>
  <div id="app" :style="{ 'background-image': 'url(' + CONST.resourceURL + background + ')'}">
    <navigation></navigation>
    <container></container>
  </div>
</template>

<script>
import Navigation from '@/views/Navigation'
import Container from '@/views/Container'
import { eventBus } from "./utils/event";
import { match } from 'ffp-js'
export default {
  name: 'app',
  data() {
    return {
      CONST: {
        resourceURL: 'https://songsin-resource.s3.ap-northeast-2.amazonaws.com/image'
      },
      background: null
    }
  },
  components: {
    Navigation,
    Container
  },
  created() {
    eventBus.$on('change:background', path => {
      match(path)
        .case(path => path === '/weather')(_ => this.background = '/weather/background.jpg')
        .case(path => path === '/notice')(_ => this.background = '/notice/background.jpg')
        .case(path => path === '/birth_notice')(_ => this.background = '/birth/background.jpg')
        .case(path => path === '/news')(_ => this.background = '/news/background.jpg')
        .case(path => path === '/sport_news')(_ => this.background = '/sport/background.jpg')
        .else(_ => _)
    })
  }
}
</script>

<style lang="scss">
@import '@/assets/style/app.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 61rem;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
