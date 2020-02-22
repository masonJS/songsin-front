<template>
  <div id="notice" v-if="content">
    <div class="notice">
      <div class="notice_title">학생회 공지</div>
      <div class="notice_content">{{ content }}</div>
    </div>
    <div class="student">
      <div class="student_title">통학생회 공지</div>
      <div class="student_content">{{ student_content }}</div>
    </div>
    <div class="oli_logo"><img src="https://songsin-resource.s3.ap-northeast-2.amazonaws.com/image/common/oli_logo.png"></div>
  </div>
</template>

<script>
  import { SONGSIN } from '../api'
  import { eventBus } from "../utils/event";

  export default {
    name: "Notice",
    data() {
      return {
        content: null,
        student_content: null
      }
    },
    created() {
      eventBus.$emit('change:background', this.$route.path)
      this.fetchNotice()
    },
    methods: {
      async fetchNotice() {
        const { data } = await SONGSIN.getNotice()
        this.content = data.content
        this.student_content = data.student_content
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/style/mixin.scss';

  .notice{
    @include position($p: absolute, $t: 10%, $l: 20%);
    @include box($w: 45rem, $h: 45rem, $border: 1px solid #eaecef, $padding: 1rem, $size: 1.2rem);
    background-color: rgba(247, 253, 208, 0.51);
    box-shadow: 1px 12px 15px rgba(0,0,0,.1);
    .notice_title{
      text-align: center;
      font-size: 2.8rem;
      font-weight: 600;
      padding: 1.5rem 0;
      color: #588803;
    }
    .notice_content{
      padding: 1rem;
      font-size: 1.3rem;
    }
  }
  .student{
    @include position($p: absolute, $t: 10%, $l: 65%);
    @include box($w: 35rem, $h: 45rem, $border: 1px solid #eaecef, $padding: 1rem, $size: 1.2rem);
    background-color: rgba(247, 253, 208, 0.51);
    box-shadow: 1px 12px 15px rgba(0,0,0,.1);
    .student_title{
      text-align: center;
      font-size: 2.8rem;
      font-weight: 600;
      padding: 1.5rem 0;
      color: #588803;
    }
    .student_content{
      padding: 1rem;
      font-size: 1.3rem;
    }
  }
  .oli_logo{
    position: fixed;
    top: 45rem;
    left: 108rem;
  }
</style>
