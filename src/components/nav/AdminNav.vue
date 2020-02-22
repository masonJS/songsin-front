<template>
  <div id="nav_list">
  <ul>
    <li v-for="(nav, index) in navList" :key="index">
      <router-link :to="nav.path">
        <div class="text">{{ nav.text }}</div>
      </router-link>
    </li>
    <li>
      <a @click='logout'>
        <img :src="navAdmin.image">
        <div class="text">{{ navAdmin.text }}</div>
      </a>
    </li>
  </ul>
  </div>
</template>

<script>
  export default {
    name: "Admin",
    data() {
      return {
        navList: [
          {
            path: '/admin/notice',
            text: '공지'
          },
          {
            path: '/admin/birth_notice',
            text: '축일자'
          }
        ],
        navAdmin: {
          image: 'https://songsin-resource.s3.ap-northeast-2.amazonaws.com/image/logout.png',
          text: '로그아웃'
        }
      }
    },
    methods: {
      logout() {
        if (confirm('관리자 로그아웃을 하시겠습니까?')) {
          this.$store.commit('LOGOUT')
          this.$router.replace('/')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/assets/style/navigation.scss';
  .text{
    margin-left: 2rem !important;
    font-size: 2rem !important;
  }
</style>
