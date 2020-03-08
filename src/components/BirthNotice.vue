<template>
  <div id="birth_notice">
    <div class="birth_header"> {{ getMonth }}월 이번 주차에 축일을 맞으신 </div>
    <div class="birth_list">
      <table class="modal-list">
        <thead>
        <tr class="modal_list_title">
          <th>학년</th>
          <th>이름</th>
          <th>축일</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(data, index) in birthList" :key="index" class="target-item">
          <td><div>{{ data.grade }}</div></td>
          <td><div class="name">{{ data.name }} ({{ data.nickname }}) </div></td>
          <td><div>{{ data.month }} / {{ data.day }}</div></td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="oli_logo"><img src="https://songsin-resource.s3.ap-northeast-2.amazonaws.com/image/common/oli_logo.png"></div>
    <div class="birth_cake">
      <img :src="img">
    </div>
  </div>
</template>

<script>
  import { SONGSIN } from '@/api'
  import { eventBus } from "../utils/event";
  import moment from 'moment'

  export default {
    name: "BirthUser",
    data() {
      return {
        img: "https://songsin-resource.s3.ap-northeast-2.amazonaws.com/image/birth/cubcake.png",
        birthList: []
      }
    },
    computed: {
      getMonth() {
        return moment(new Date()).get('M') + 1
      },
      getWeek() {
        return moment(new Date(), "YYYY-MM-DD").week()
      },
    },
    async created() {
      eventBus.$emit('change:background', this.$route.path)
      const { data } = await SONGSIN.getBirth()
      this.birthList = data
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/style/mixin.scss';

  #birth_notice{
    @include position($p: absolute, $t: 7%, $l: 29%);
    @include box($w: 65rem, $h: 50rem, $border: 1px solid #eaecef);
    box-shadow: 1px 12px 15px rgba(0,0,0,.1);
    background-color: rgba(250, 241, 207, 0.72);
    .birth_header{
      @include box($w: 100%, $h: 20%, $size: 3.4rem, $align: center, $padding: 3rem);
      font-weight: 900;
      color: #ffa2ab;
    }
    .birth_list{
      @include box($w: 100%, $h: 55%);
      padding: 0 7rem;
      .modal-list{
        width: 100%;
        text-align: center;
        border-collapse: separate;
        border-spacing: 0px;
        thead{
          tr{
            line-height: 4rem;
            th{
              font-size: 1.5rem;
              color: #555;
              border-bottom: 1px solid #ddd;
            }
          }
        }
        tbody{
          tr{
            line-height: 4rem;
            cursor: pointer;
            &:hover{
              background-color: #f5f5f6;
            }
            td{
              padding: 0 1rem;
              div{
                white-space: nowrap;
                text-overflow: ellipsis;
                &.name{
                  @include box($line-h: 22px, $overflow: hidden, $margin: 0 auto);
                }
              }
            }
          }
        }
      }
    }
    .oli_logo{
      width: 30%;
      position: fixed;
      top: 51rem;
      left: 32rem;
    }
    .birth_cake{
      @include box($w: 100%, $h: 25%, $align: center);
      img{
        @include box($w: 50%);
        width: 33%;
        position: fixed;
        top: 30rem;
        left: 68rem;
      }
    }
  }

</style>
