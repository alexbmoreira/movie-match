<template>
  <div class="bg-app-bg md:flex md:items-center md:justify-between p-4 pb-0 md:pb-4">
    <!-- Logo text or image -->
    <div class="flex items-center justify-between mb-4 md:mb-0">
      <router-link to="/" class="cursor-pointer w-60">
        <Logo />
      </router-link>
      <div class="flex space-x-2">
        <button class="flex items-center text-2xl transition duration-400 ease-in-out hover:text-app-primary md:hidden" @click="showSearch()">
          <i class="fas fa-search"></i>
        </button>

        <button class="flex items-center text-3xl transition duration-400 ease-in-out hover:text-app-primary md:hidden">
          <i class="fa fa-bars"></i>
        </button>
      </div>
    </div>

    <!-- Search field -->
    <div class="flex h-0 transition-height duration-600 ease-in-out" :class="{ 'h-10': show_search, 'invisible': !show_search }">
      <input v-model="search" type="text" placeholder="Search for a movie..." class="bg-transparent w-full px-3 mb-3 border-b-2 border-app-bg-sec-light focus:border-app-primary transition duration-500 focus:outline-none" />
      <button class="w-auto flex justify-end items-center pl-4 transition duration-400 ease-in-out hover:text-app-primary"><i class="fas fa-search"></i></button>
    </div>

    <!-- Nav Bar -->
    <!-- <nav>
      <button
        class="invisible md:visible cursor-pointer text-white border-2 border-solid hover:border-double font-medium md:py-2 rounded shadow-lg hover:shadow-xl hover:bg-white hover:font-bold hover:text-app-accent transition duration-200"
        type="submit"
      >
        <a class="m-6"> Login </a>
      </button>

      <a class="invisible md:visible text-white font-semibold md:py-2 m-4 hover:text-app-primary"> Register </a>
    </nav> -->
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
      show_search: false
    }
  },
  methods: {
    showSearch() {
      this.show_search = !this.show_search
    }
  }
}
</script>
