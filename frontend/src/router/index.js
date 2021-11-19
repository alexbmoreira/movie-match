import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Home from '@/views/home/Home'
import Profile from '@/views/profile/Profile'
import AuthPage from '@/views/auth/AuthPage'
import Search from '@/views/search/Search'
import NotFound from '@/views/NotFound'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profile/:id/:username',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/register',
    name: 'Register',
    component: AuthPage,
    meta: {
      requiresNoAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: AuthPage,
    meta: {
      requiresNoAuth: true
    }
  },
  {
    path: '/search/:searchType/:search',
    name: 'Search',
    component: Search
  },
  {
    path: '*',
    name: 'Not Found',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresNoAuth)) {
    if (!store.getters.isLoggedIn) {
      next()
      return
    }
    next('/')
  } else {
    next()
  }
})

export default router
