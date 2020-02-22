<template>
  <div id="weather" v-if="weatherList.length !== 0">
    <div class="weather_content">
      <div class="weather_header">
        <div>
          <div class="weather_icon">
            <img :src="weather.icon">
          </div>
          <div class="weather_temp">
            <h1>{{ weather.temp }} ℃</h1>
            <strong>{{ weather.text.main }}</strong> {{ weather.text.description }}
          </div>
          <div class="dust">
            <p>미세먼지 {{ dust.pm10Value }}  ㎍/㎥ <strong :class="getDustColor(dust.pm10Grade)">{{ getDustGrade(dust.pm10Grade) }}</strong></p>
            <p>초미세먼지 {{ dust.pm25Value }}  ㎍/㎥ <strong :class="getDustColor(dust.pm25Grade)">{{ getDustGrade(dust.pm25Grade) }}</strong></p>
          </div>
        </div>
      </div>
      <div class="weather_list">
        <div class="weather_forecast" v-for="(data, index) in weatherList" :key="index">
          <p>{{ data.date }} 일</p>
          <div>
            <img :src="data.icon.min"> / <img :src="data.icon.max">
          </div>
          <div>
            <p>{{ data.temp.min }}℃ / {{ data.temp.max }}℃</p>
          </div>
        </div>
      </div>
    </div>
    <div class="oli_logo"><img src="https://songsin-resource.s3.ap-northeast-2.amazonaws.com/image/common/oli_logo.png"></div>
  </div>
</template>

<script>
  import { WEATHER, SONGSIN } from '@/api'
  import { weather2text, getDate } from '@/utils/converter'
  import { ServiceKey } from '../../config/dust'
  import { eventBus } from "../utils/event";
  import { map, go, log, tap, filter, groupBy, match } from 'ffp-js'
  export default {
    name: "Weather",
    data() {
      return {
        CONST: {
          lat: 37.585898, // 성신교정 위도
          lon: 127.004356 // 성신교정 경도
        },
        weather: {},
        dust: {},
        weatherList: [],
      }
    },
    created() {
      eventBus.$emit('change:background', this.$route.path)
      this.$emit('on:progress')
      this.fetchWeather()
      this.fetchWeatherList()
      this.fetchDust()
      this.$emit('off:progress')
    },
    methods: {
      fetchWeather() {
        return go(
          WEATHER.getDay(this.CONST.lat, this.CONST.lon),
          ({ data }) => ({
            temp: Math.round(data.main.temp - 273.15),
            text : weather2text(data.weather[0].id),
            icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
          }),
          obj => (this.weather = obj)
        )
      },
      fetchWeatherList() {
        return go(
          WEATHER.getWeek(this.CONST.lat, this.CONST.lon),
          ({ data: { list } }) => list,
          map(data => ({
            temp: Math.round(data.main.temp - 273.15),
            icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
            date: data.dt_txt
          })),
          filter(data => data.date.includes('06:00:00') ||  data.date.includes('21:00:00') ),
          map(data => data.date.includes('06:00:00') ? Object.assign(data, { state: 'max' }) : Object.assign(data, { state: 'min'})),
          groupBy(data => data.state),
          obj => obj.min.map((val, index)=> ({
            temp: { min: val.temp, max: obj.max[index].temp },
            icon: { min: val.icon, max: obj.max[index].icon },
            date : getDate(obj.max[index].date, 'date')
          })),
          list => (this.weatherList = list)
        )
      },
      fetchDust(){
        return go(
          SONGSIN.getDust('종로구', 'DAILY', 1, 1, '1.0', ServiceKey),
          ({ data }) => data,
          obj => (this.dust = obj)
        )
      },
      getDustColor(value){
        return match(value)
          .case(value => value === '1')(_ => 'blue')
          .case(value => value === '2')(_ => 'orange')
          .else(_ => 'red')
      },
      getDustGrade(value){
        return match(value)
          .case(value => value === '1')(_ => '좋음')
          .case(value => value === '2')(_ => '보통')
          .case(value => value === '3')(_ => '나쁨')
          .else(_ => '매우 나쁨')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/style/mixin.scss';

  #weather{
    @include position($p: absolute, $t: 10%, $l: 20%);
    @include box($w: 80rem, $h: 45rem, $border: 1px solid #eaecef);
    box-shadow: 1px 12px 15px rgba(0,0,0,.1);
    background-color: rgba(226, 221, 231, 0.72);
    .weather_content{
      width: 100%;
      height: 100%;
      padding: 1rem;

      .weather_header{
        @include box($w: 100%, $h: 20%);
        div{
          height: 100%;
          .weather_icon{
            width: 30%;
            float: left;
            img{
              width: 45%;
              float: right;
            }
          }
          .weather_temp{
            width: 30%;
            height: 100%;
            float: left;
            padding: 1rem;
            h1{
              font-size: 3.5rem;
              padding-bottom: 0.5rem;
            }
            strong{
              font-size: 2.5rem;
            }
          }
          .dust{
            float: left;
            width: 40%;
            p{
              padding-top: 1rem;
              font-size: 1.8rem;
              .red{
                color: red;
              }
              .orange{
                color: orange;
              }
              .blue{
                color: blue;
              }
            }
          }
        }
      }
      .weather_list{
        width: 100%;
        height: 80%;
        padding: 2rem;
        .weather_forecast{
          width: 20%;
          height: 100%;
          float: left;
          border: 1px solid #eaecef;
          text-align: center;
          p{
            font-size: 2rem;
            padding: 20% 0;
          }
          div{
            padding: 25% 0;
            p{
              font-size: 2rem;
            }
          }
        }
      }
    }
    .oli_logo{
      position: fixed;
      top: 45rem;
      left: 98rem;
    }
  }
</style>
