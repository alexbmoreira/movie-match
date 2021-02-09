<template>
  <div class="bg-app-bg fixed top-0 inset-x-0">
    <div class="p-4 pb-2 md:pb-4">
      <!-- Logo text or image -->
      <div class="flex items-center justify-between mb-4">
        <router-link to="/" class="cursor-pointer w-60">
          <Logo />
        </router-link>
        <div class="flex space-x-2">
          <button class="flex items-center text-2xl transition duration-400 ease-in-out hover:text-app-primary" @click="showSearch()">
            <i class="fas fa-search"></i>
          </button>
          <button class="flex items-center text-3xl transition duration-400 ease-in-out hover:text-app-primary" @click="showMenu()">
            <i class="fa fa-bars"></i>
          </button>
        </div>
      </div>

      <!-- Search field -->
      <div class="flex h-0 space-x-3 opacity-0 transition-all duration-600 ease-in-out" :class="{ 'h-12': show_search, 'opacity-100': show_search }">
        <input v-model="search.string" v-on:keyup.enter="routeSearch" type="text" placeholder="Search for a movie..." class="bg-transparent w-full px-3 pb-2 my-auto border-b-2 border-app-bg-sec-light focus:border-app-primary transition duration-500 focus:outline-none" />
        <button class="w-auto flex justify-end items-center transition duration-400 ease-in-out hover:text-app-primary" @click.prevent="routeSearch"><i class="fas fa-search"></i></button>
        <div class="flex flex-col">
          <label for="searchType" class="text-xs">Search for:</label>
          <select id="searchType" v-model="search.type" class="bg-app-bg rounded">
            <option value="movies">Movies</option>
            <option value="actors">Actors</option>
            <option value="crew">Crew</option>
          </select>
        </div>
      </div>

      <!-- Nav Bar -->
      <div class="flex h-0 opacity-0 transition-all duration-600 ease-in-out" :class="{ 'h-12': show_menu, 'opacity-100': show_menu }">
        <div v-show="!isLoggedIn" class="flex my-auto mx-auto space-x-4">
          <button class="bg-transparent rounded border border-app-typeface px-2 py-1 transition duration-400 ease-in-out hover:bg-app-primary hover:border-opacity-0" @click.prevent="goLogin()">Log In</button>
          <button class="bg-transparent px-2 py-1 transition duration-400 ease-in-out hover:text-app-primary" @click.prevent="goRegister()">Register</button>
        </div>
        <div v-show="isLoggedIn" class="flex my-auto mx-auto space-x-4">
          <button class="bg-transparent px-2 py-1 transition duration-400 ease-in-out hover:text-app-primary" @click.prevent="logout()">Log Out</button>
        </div>
      </div>
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
      search: [
        {string: ''},
        {type: 'movies'}
      ],
      //search_type: 'movies',
      show_search: false,
      show_menu: false
    }
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn
    }
  },
  methods: {
    routeSearch() {

      //temporary spaghetti, come back to this
      if(this.$route.name === 'Search'){
        console.log('BITCH')
        this.$router.push({name: 'Login'})
      }

      else {

        this.$router.push({name: 'Search', query:{type: this.search.string}, params:{data:this.search}}).catch(err => {
          // Ignore the vuex err regarding  navigating to the page they are already on. //path: '/search',
          if (
            err.name !== 'NavigationDuplicated' &&
            !err.message.includes('Avoided redundant navigation to current location')
          ) {
            // But print any other errors to the console
            console.log(err);
          }
        });
        //params are ignored if path is provided
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
