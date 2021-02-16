<template>
  <div class="bg-app-bg fixed top-0 inset-x-0 shadow-lg">
    <div class="p-4 pb-0" :class="{ 'pb-4': showSearch || showMenu }">
      <!-- Logo text or image -->
      <div class="flex items-center justify-between mb-4">
        <router-link to="/" class="cursor-pointer w-60">
          <Logo />
        </router-link>
        <div class="flex space-x-6 mx-5 lg:w-full">
          <div class="space-x-3 hidden lg:w-full lg:flex">
            <form class="flex w-full" @submit.prevent="routeSearch"><TextField v-model="search.string" :placeholder="`Search for ${search.type}...`" /></form>
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
              <button class="bg-transparent w-20 px-2 py-1 transition duration-400 ease-in-out hover:text-app-primary" @click.prevent="logout()">Log Out</button>
            </div>
          </div>
        </div>
        <div class="flex space-x-2 lg:hidden">
          <button class="flex items-center text-2xl transition duration-400 ease-in-out hover:text-app-primary" @click="showSearchDropdown()">
            <i class="fas fa-search"></i>
          </button>
          <button class="flex items-center text-3xl transition duration-400 ease-in-out hover:text-app-primary" @click="showMenuDropdown()">
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
        <div v-if="showSearch" class="flex space-x-3">
          <form class="flex w-full" @submit.prevent="routeSearch"><TextField v-model="search.string" :placeholder="`Search for ${search.type}...`" /></form>
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
        <div v-if="showMenu" class="flex">
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
import TextField from '@/components/actions/TextField'

export default {
  name: 'Navbar',
  components: {
    Logo,
    TextField
  },
  data() {
    return {
      search: {
        string: '',
        type: 'movies'
      },
      windowWidth: window.innerWidth,
      showSearch: false,
      showMenu: false
    }
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn
    }
  },
  created() {
    window.addEventListener('resize', this.onResize)
  },
  destroyed() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth
      if (this.showSearch === true) {
        this.showSearch = this.windowWidth <= 1023
      } else if (this.showMenu === true) {
        this.showMenu = this.windowWidth <= 1023
      }
    },
    routeSearch() {
      if (this.search.string.length > 0) {
        this.$store.dispatch('makeSearch', this.search)
        this.$router.push({ name: 'Search' }).catch(() => {})
      }
    },
    showSearchDropdown() {
      this.showSearch = !this.showSearch
      this.showMenu = false
    },
    showMenuDropdown() {
      this.showMenu = !this.showMenu
      this.showSearch = false
    },
    goLogin() {
      this.$router.push({ name: 'Login' }).catch(() => {})
    },
    goRegister() {
      this.$router.push({ name: 'Register' }).catch(() => {})
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
