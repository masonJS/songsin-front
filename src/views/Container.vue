<template>
<div id="container">
  <vue-progress-bar></vue-progress-bar>
  <transition name="routing-fade" mode="out-in">
    <router-view @on:progress="onProgress" @off:progress="offProgress" ></router-view>
  </transition>
</div>
</template>

<script>
  export default {
    name: "Container",
    data() {
      return {
        loading: false
      }
    },
    methods: {
      onProgress() {
        this.$Progress.start()
      },
      offProgress() {
        this.$Progress.finish()
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '@/assets/style/container';
/* Router Transition */
.routing-fade-enter-active, .routing-fade-leave-active {
  transition: opacity .3s ease;
}
.routing-fade-enter, .routing-fade-leave-to
  /* .routing-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
