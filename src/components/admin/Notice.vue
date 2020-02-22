<template>
  <div id="notice">
    <div class="notice">
      <div class="notice_title">학생회 공지</div>
      <div class="notice_content">
        <textarea v-model="content">
      </textarea>
      </div>
    </div>
    <div class="student">
      <div class="student_title">통학생회 공지</div>
      <div class="student_content">
        <textarea v-model="student_content">
      </textarea>
      </div>
    </div>
    <div class="btn-box">
      <button @click="saveNotice">저장</button>
    </div>
  </div>
</template>

<script>
  import { SONGSIN } from '../../api'
  export default {
    name: "Notice",
    data() {
      return {
        content: null,
        student_content: null
      }
    },
    created() {
      this.fetchNotice()
    },
    methods: {
      async fetchNotice() {
        const { data } = await SONGSIN.getNotice()
        this.content = data.content
        this.student_content = data.student_content
      },
      async saveNotice() {
        try {
          await SONGSIN.createNotice({
            content: this.content,
            student_content: this.student_content
          })
          alert('공지글이 등록되었습니다.')
          this.fetchNotice()
        } catch (e){
          console.log(e.message)
          alert('알수 없는 에러입니다, 개발자에게 문의 하세요.')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/style/mixin.scss';

  .notice{
    @include position($p: absolute, $t: 10%, $l: 20%);
    @include box($w: 45rem, $h: 43rem, $border: 1px solid #eaecef, $padding: 1rem, $size: 1.2rem);
    box-shadow: 1px 12px 15px rgba(0,0,0,.1);
    .notice_title{
      text-align: center;
      font-size: 2.8rem;
      font-weight: 600;
      padding: 1.5rem 0;
    }
    .notice_content{
      padding: 1rem;
      font-size: 1.3rem;
    }
  }
  .student{
    @include position($p: absolute, $t: 10%, $l: 65%);
    @include box($w: 35rem, $h: 43rem, $border: 1px solid #eaecef, $padding: 1rem, $size: 1.2rem);
    box-shadow: 1px 12px 15px rgba(0,0,0,.1);
    .student_title{
      text-align: center;
      font-size: 2.8rem;
      font-weight: 600;
      padding: 1.5rem 0;
    }
    .student_content{
      padding: 1rem;
      font-size: 1.3rem;
    }
  }
  input{
    @include box($w: 100%, $padding: 15px, $radius: 5px, $border: 1px solid #d0dad5, $bg: #fff);
    @include font($size: 1.05rem, $weight: 400, $color: #222);
    margin-bottom: 10px;
    &::placeholder{
      @include font($weight: 300, $color: #959595);
    }
  }
  textarea{
    @extend input;
    height: 33rem;
    resize: none;
  }
  .btn-box{
    @include position($p: absolute, $t: 85%, $l: 57%);
    button{
      @include button($p: 0 4rem, $h: 3rem)
      @include font($size: 1.05rem)
    }
  }
</style>
