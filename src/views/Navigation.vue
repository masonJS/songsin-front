<template>
  <div id="nav">
    <div class="logo_img">
      <img src="https://songsin-resource.s3.ap-northeast-2.amazonaws.com/image/common/school_log.png">
    </div>
    <router-view name="nav"></router-view>

  </div>
</template>

<script>
  import MainNav from '@/components/nav/MainNav'
  export default {
    name: "Navigation",
    components: {
      MainNav
    }
  }
</script>

<style lang="scss" scoped>
@import '@/assets/style/navigation.scss';
.logo_img{
  width: 5.5rem;
  height: 6rem;
  margin: 0 auto;
  img{
    width: 100%;
    height: 100%;
  }
}
.student_logo_img{
  position: absolute;
  bottom: 0;
  img{
    width: 100%
  }
}
</style>
