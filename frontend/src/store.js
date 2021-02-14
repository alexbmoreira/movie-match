import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import authAPI from '@/api/auth'
import searchAPI from '@/api/movies'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: Cookies.get('access_token') || '',
    user: Cookies.get('user') || {},
    search: {},
    searchData: {}
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
    },
    setSearchData(state, data) {
      state.searchData = data
    },
    setSearchInfo(state, search) {
      state.search = search
    }
  },
  actions: {
    async loginUser(context, payload) {
      await authAPI.login(payload).then(response => {
        const token = response.key

        context.commit('success', token)
      })

      await authAPI.getUser().then(user => {
        context.commit('setUser', user)
      })
    },
    async registerUser(context, payload) {
      await authAPI.register(payload).then(response => {
        const token = response.key

        context.commit('success', token)
      })

      await authAPI.getUser().then(user => {
        context.commit('setUser', user)
      })
    },
    async logoutUser(context) {
      await authAPI.logout()

      context.commit('logout')
    },
    async makeSearch(context, payload) {
      await searchAPI.searchMovie(payload.type, payload.string).then(data => {
        context.commit('setSearchData', data)
      })

      context.commit('setSearchInfo', payload)
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
    },
    searchData: state => state.searchData,
    search: state => state.search.string,
    searchType: state => state.search.type
  }
})

export default store
