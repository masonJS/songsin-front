import { go, map } from 'ffp-js'
import { store } from '../store'
import AdminNav from '../components/nav/AdminNav'
import Container from '../views/Container'
const admin = {
  path: '/admin',
  redirect: '/admin/notice',
  components: {
    nav: AdminNav,
    default: Container
  },
  children: [
    {
      path: 'notice',
      component: () => import('../components/admin/Notice')
    },
    {
      path: 'birth_notice',
      component: () => import('../components/admin/BirthNotice')
    }
  ]
}

go(
  admin.children,
  map(router => Object.assign(router, {
    beforeEnter: (to, from, next) => {
      if (!store.state.isLogin) return (alert('관리자 로그인을 해주세요.'),  next('/setting'))
      next()
    }
  }))
)

export { admin }
