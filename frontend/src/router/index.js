import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Home from '@/views/Home'
import Profile from '@/views/Profile'
import Register from '@/views/Register'
import Login from '@/views/Login'
import Search from '@/views/Search'
import NotFound from '@/views/NotFound'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profile/:username',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      requiresNoAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
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
    console.log(store)
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
