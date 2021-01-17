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
      <div class="flex h-0 opacity-0 transition-all duration-600 ease-in-out" :class="{ 'h-12': show_search, 'opacity-100': show_search }">
        <input v-model="search" type="text" placeholder="Search for a movie..." class="bg-transparent w-full px-3 pb-2 my-auto border-b-2 border-app-bg-sec-light focus:border-app-primary transition duration-500 focus:outline-none" />
        <button class="w-auto flex justify-end items-center pl-4 transition duration-400 ease-in-out hover:text-app-primary"><i class="fas fa-search"></i></button>
      </div>

      <!-- Nav Bar -->
      <div class="flex h-0 opacity-0 transition-all duration-600 ease-in-out" :class="{ 'h-12': show_menu, 'opacity-100': show_menu }">
        <div class="flex my-auto mx-auto space-x-4">
          <button class="bg-transparent rounded border border-app-typeface px-2 py-1 transition duration-400 ease-in-out hover:bg-app-primary hover:border-opacity-0" @click="login()">Log In</button>
          <button class="bg-transparent px-2 py-1 transition duration-400 ease-in-out hover:text-app-primary" @click="register()">Register</button>
        </div>
      </div>
    </div>
    <!-- <div class="flex ml-5 w-full invisible md:visible">
        <input v-model="search" type="text" placeholder="Search for a movie..." class="bg-transparent w-full px-3 py-2 my-auto border-b-2 border-app-bg-sec-light focus:border-app-primary transition duration-500 focus:outline-none" />
        <button class="w-auto flex justify-end items-center pl-4 transition duration-400 ease-in-out hover:text-app-primary"><i class="fas fa-search"></i></button>
      </div>
      <div class="flex ml-5 invisible md:visible">
        <div class="flex my-auto space-x-4">
          <button class="bg-transparent rounded border border-app-typeface px-2 py-1 transition duration-400 ease-in-out hover:bg-app-primary hover:border-opacity-0" @click="login()">Log In</button>
          <button class="bg-transparent px-2 py-1 transition duration-400 ease-in-out hover:text-app-primary" @click="register()">Register</button>
        </div>
      </div> -->
  </div>
</template>

<script>
import Logo from './SVGComponents/Logo'

export default {
  components: {
    Logo
  },
  data() {
    return {
      search: '',
      show_search: false,
      show_menu: false
    }
  },
  methods: {
    showSearch() {
      this.show_search = !this.show_search
      this.show_menu = false
    },
    showMenu() {
      this.show_menu = !this.show_menu
      this.show_search = false
    },
    login() {
      this.$router.push({ name: 'Login' })
    },
    register() {
      this.$router.push({ name: 'Register' })
    }
  }
}
</script>
