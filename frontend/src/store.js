import Vue from "vue";
import Vuex from "vuex";
import VueCookies from 'vue-cookies'
import authAPI from "./api/auth";

Vue.use(Vuex);
Vue.use(VueCookies)

const store = new Vuex.Store({
  state: {
    token: Vue.$cookies.get("access_token") || ""
  },
  mutations: {
    success(state, token) {
      state.token = token;
      Vue.$cookies.set("access_token", token);
    },
    logout(state) {
      state.token = "";
      Vue.$cookies.remove("access_token");
    }
  },
  actions: {
    async loginUser(context, payload) {
      const response = await authAPI.login(payload);
      const token = response.key

      context.commit("success", token);
    },
    async registerUser(context, payload) {
      const response = await authAPI.register(payload);
      console.log(response)
      const token = response.key

      context.commit("success", token);
    },
    async logoutUser(context) {
      await authAPI.logout();

      context.commit("logout");
    }
  },
  getters: {
    isLoggedIn: state => !!state.token
  }
});

export default store;