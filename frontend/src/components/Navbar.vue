<template>
  <div class="bg-app-bg fixed top-0 inset-x-0">
    <div class="p-4 pb-0" :class="{ 'pb-4': show_search || show_menu }">
      <!-- Logo text or image -->
      <div class="flex items-center justify-between mb-4">
        <router-link to="/" class="cursor-pointer w-60">
          <Logo />
        </router-link>
        <div class="flex space-x-6 mx-5 w-full">
          <div class="space-x-3 hidden w-full lg:flex">
            <input
              v-model="search.string"
              type="text"
              placeholder="Search for a movie..."
              class="bg-transparent w-full px-3 pb-2 my-auto border-b-2 border-app-bg-sec-light focus:border-app-primary transition duration-500 focus:outline-none"
              @keyup.enter="routeSearch"
            />
            <button class="w-auto flex justify-end items-center transition duration-400 ease-in-out hover:text-app-primary" @click.prevent="routeSearch">
              <i class="fas fa-search"></i>
            </button>
            <div class="flex flex-col">
              <label for="searchType" class="text-xs">Search for:</label>
              <select id="searchType" v-model="search.type" class="bg-app-bg rounded">
                <option value="movies">Movies</option>
                <option value="actors">Actors</option>
                <option value="crew">Crew</option>
              </select>
            </div>
          </div>
          <div class="hidden lg:flex">
            <div v-show="!isLoggedIn" class="flex my-auto space-x-4">
              <button class="bg-transparent rounded border border-app-typeface w-20 px-4 py-1 transition duration-400 ease-in-out hover:bg-app-primary hover:border-opacity-0" @click.prevent="goLogin()">Log In</button>
              <button class="bg-transparent px-2 py-1 transition duration-400 ease-in-out hover:text-app-primary" @click.prevent="goRegister()">Register</button>
            </div>
            <div v-show="isLoggedIn" class="flex my-auto mx-auto space-x-4">
              <button class="bg-transparent px-2 py-1 transition duration-400 ease-in-out hover:text-app-primary" @click.prevent="logout()">Log Out</button>
            </div>
          </div>
        </div>
        <div class="flex space-x-2 lg:hidden">
          <button class="flex items-center text-2xl transition duration-400 ease-in-out hover:text-app-primary" @click="showSearch()">
            <i class="fas fa-search"></i>
          </button>
          <button class="flex items-center text-3xl transition duration-400 ease-in-out hover:text-app-primary" @click="showMenu()">
            <i class="fa fa-bars"></i>
          </button>
        </div>
      </div>

      <!-- Search field -->
      <transition
        enter-active-class="transistion-all duration-100 ease-in"
        leave-active-class="transistion-all duration-100 ease-out"
        enter-class="opacity-0 h-0"
        enter-to-class="opacity-100 h-12"
        leave-class="opacity-100 h-12"
        leave-to-class="opacity-0 h-0"
      >
        <div v-if="show_search" class="flex space-x-3">
          <input
            v-model="search.string"
            type="text"
            placeholder="Search for a movie..."
            class="bg-transparent w-full px-3 pb-2 my-auto border-b-2 border-app-bg-sec-light focus:border-app-primary transition duration-500 focus:outline-none"
            @keyup.enter="routeSearch"
          />
          <button class="w-auto flex justify-end items-center transition duration-400 ease-in-out hover:text-app-primary" @click.prevent="routeSearch">
            <i class="fas fa-search"></i>
          </button>
          <div class="flex flex-col">
            <label for="searchType" class="text-xs">Search for:</label>
            <select id="searchType" v-model="search.type" class="bg-app-bg rounded">
              <option value="movies">Movies</option>
              <option value="actors">Actors</option>
              <option value="crew">Crew</option>
            </select>
          </div>
        </div>
      </transition>

      <!-- Logins -->
      <transition
        enter-active-class="transistion-all duration-100 ease-in"
        leave-active-class="transistion-all duration-100 ease-out"
        enter-class="opacity-0 h-0"
        enter-to-class="opacity-100 h-12"
        leave-class="opacity-100 h-12"
        leave-to-class="opacity-0 h-0"
      >
        <div v-if="show_menu" class="flex">
          <div v-show="!isLoggedIn" class="flex my-auto mx-auto space-x-4">
            <button class="bg-transparent rounded border border-app-typeface w-20 px-4 py-1 transition duration-400 ease-in-out hover:bg-app-primary hover:border-opacity-0" @click.prevent="goLogin()">Log In</button>
            <button class="bg-transparent px-2 py-1 transition duration-400 ease-in-out hover:text-app-primary" @click.prevent="goRegister()">Register</button>
          </div>
          <div v-show="isLoggedIn" class="flex my-auto mx-auto space-x-4">
            <button class="bg-transparent px-2 py-1 transition duration-400 ease-in-out hover:text-app-primary" @click.prevent="logout()">Log Out</button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Logo from './SVGComponents/Logo'

export default {
  name: 'Navbar',
  components: {
    Logo
  },
  data() {
    return {
      search: {
        string: '',
        type: 'movies',
        window_width: window.innerWidth
      },
      show_search: false,
      show_menu: false
    }
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn
    }
  },
  created() {
    document.addEventListener('resize', this.onResize)
  },
  destroyed() {
    document.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize() {
      console.log(window.width)
      this.window_width = window.width
      if (this.show_search === true) {
        this.show_search = this.window_width <= 767
      }
    },
    routeSearch() {
      if (this.search.string.length > 0) {
        this.$router
          .push({
            name: 'Search',
            params: {
              search_type: this.search.type,
              search: this.search.string
            }
          })
          .catch(() => {})
      }
    },
    showSearch() {
      this.show_search = !this.show_search
      this.show_menu = false
    },
    showMenu() {
      this.show_menu = !this.show_menu
      this.show_search = false
    },
    goLogin() {
      this.$router.push({ name: 'Login' })
    },
    goRegister() {
      this.$router.push({ name: 'Register' })
    },
    async logout() {
      try {
        await this.$store.dispatch('logoutUser')
        this.$router.push({ name: 'Login' })
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>
