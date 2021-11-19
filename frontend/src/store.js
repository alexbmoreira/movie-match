import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import authAPI from '@/api/auth'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: Cookies.get('access_token') || '',
    user: Cookies.get('user') || {}
  },
  mutations: {
    success(state, token) {
      state.token = token
      Cookies.set('access_token', token, { sameSite: 'Lax' })
    },
    setUser(state, user) {
      state.user = user
      Cookies.set('user', user)
    },
    logout(state) {
      state.token = ''
      state.user = {}
      Cookies.remove('access_token')
      Cookies.remove('user')
    }
  },
  actions: {
    async loginUser(context, payload) {
      return new Promise((resolve) => {
        authAPI.login(payload).then(response => {
          const token = response.key

          if(token) {
            context.commit('success', token)
          }
          resolve(response)
        })
      })
    },
    async registerUser(context, payload) {
      return new Promise((resolve) => {
        authAPI.register(payload).then(response => {
          const token = response.key

          if(token) {
            context.commit('success', token)
          }
          resolve(response)
        })
      })
    },
    async logoutUser(context) {
      await authAPI.logout()

      context.commit('logout')
    },
    async setUser(context) {
      await authAPI.getUser().then(user => {
        context.commit('setUser', user)
      })
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    user: state => {
      try {
        return typeof state.user === 'object' ? state.user : JSON.parse(state.user)
      } catch {
        return {}
      }
    }
  }
})

export default store
