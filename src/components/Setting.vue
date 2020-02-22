<template>
  <div id="setting">
    <div class="login__wrap">
      <div class="login__box">
        <router-link to="/" class="login__logo">
          <img src="https://songsin-resource.s3.ap-northeast-2.amazonaws.com/image/jesus.png" class="login__logo-img" alt="songsin_logo">
        </router-link>
        <div class="login__input-box" @keyup.enter="signIn">
          <input type="text" v-model='data.id' class="id" placeholder="아이디를 입력해주세요.">
          <input type="password" v-model='data.pw' class="pw" placeholder="비밀번호를 입력해주세요.">
          <button @click="signIn" class="login__btn">로그인</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { SONGSIN } from '@/api'
  export default {
    name: "Setting",
    data() {
      return {
        data: {
          id: null,
          pw: null
        }
      }
    },
    methods:{
      async signIn() {
        if (!this.data.id) return alert('아이디를 입력해주세요.')
        if (!this.data.pw) return alert('비밀번호를 입력해주세요.')
        const { data } = await SONGSIN.getUser(this.data.id, this.data.pw)
        return data.length === 0
          ? alert('존재하지 않은 사용자입니다.')
          : (this.$store.commit('LOGIN'), this.$router.push('/admin'))
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/style/mixin.scss';

  #setting{
    margin-left: 0 !important;
    .login__wrap{
      width: 100%;
      .login__box{
        @include position($t: 50%, $l: 55%);
        @include box($w: 25rem, $h: 35rem);
        transform: translate(-50%,-50%);
        .login__logo{
          @include box($display: block, $h: 230px, $padding: 0 0 20px 0);
          position: relative;
          img{
            @include box($w: auto, $h: 93%);
            @include position(relative, $l: 50%);
            transform: translateX(-50%);
          }
        }
        .login__input-box{
          input{
            @include box($w: 100%, $h: 58px, $bg: transparent);
            padding: 20px;
            border: none;
            color: #000;
            border-bottom: 1px solid #000;
            border-radius: 0;
            font-size: 1.15rem;
            margin-top: 10px;
            &::placeholder{
              font-weight: 300;
              color: #000
            }
          }
          .login__btn{
            @include box($w: 100%, $h: 52px, $margin: 50px 0 0 0);
            @include button($bg: rgba(255,255,255,0.7), $radius: 50px, $size: 1.15rem, $color: #000);
            box-shadow: 0 0 15px 0 rgba(124, 124, 124, 0.4);
            &:hover{
              background-color: rgba(255,255,255,1);
              transition: all 0.5s ease;
            }
          }
        }
      }
    }
  }


</style>
