import Vue from 'vue'
import VueRouter from 'vue-router'
import MainNav from '../components/nav/MainNav'
import Container from '../views/Container'
import Weather from '../components/Weather'
import Notice from '../components/Notice'
import BirthNotice from '../components/BirthNotice'
import News from '../components/News'
import SportNews from '../components/SportNews'
import Setting from '../components/Setting'
import { admin } from './admin.js'
Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/weather',
      components: {
        nav: MainNav,
        default: Container
      },
      children: [
        {
          path: 'weather',
          component: Weather
        },
        {
          path: 'notice',
          component: Notice
        },
        {
          path: 'birth_notice',
          component: BirthNotice
        },
        {
          path: 'news',
          component: News
        },
        {
          path: 'sport_news',
          component: SportNews
        },
        {
          path: 'setting',
          component: Setting
        }
      ]
    },
    admin
  ]
})
