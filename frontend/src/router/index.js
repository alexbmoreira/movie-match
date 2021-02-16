import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
//import About from '../views/About.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Search from '../views/Search.vue'
import Profile from '../views/Profile.vue'
//import Home from '@/views/Home'
//import Profile from '@/views/Profile'
//import Register from '@/views/Register'
//import Login from '@/views/Login'
//import Search from '@/views/Search'

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
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
