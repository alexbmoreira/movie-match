import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import authAPI from './api/auth'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: Cookies.get('access_token') || ''
  },
  mutations: {
    success(state, token) {
      state.token = token
      Cookies.set('access_token', token, { sameSite: 'Lax' })
    },
    logout(state) {
      state.token = ''
      Cookies.remove('access_token')
    }
  },
  actions: {
    async loginUser(context, payload) {
      const response = await authAPI.login(payload)
      const token = response.key

      context.commit('success', token)
    },
    async registerUser(context, payload) {
      const response = await authAPI.register(payload)
      console.log(response)
      const token = response.key

      context.commit('success', token)
    },
    async logoutUser(context) {
      await authAPI.logout()

      context.commit('logout')
    }
  },
  getters: {
    isLoggedIn: state => !!state.token
  }
})

export default store
