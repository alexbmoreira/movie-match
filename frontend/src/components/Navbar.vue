<template>
  <div class="bg-app-bg fixed top-0 inset-x-0">
    <div class="p-4 pb-0" :class="{ 'pb-4': showSearch || showMenu }">
      <!-- Logo text or image -->
      <div class="flex items-center justify-between mb-4">
        <router-link to="/" class="cursor-pointer w-60">
          <Logo />
        </router-link>
        <div class="flex space-x-6 mx-5 lg:w-full">
          <div class="hidden lg:w-full lg:flex">
            <SearchBar />
          </div>
          <div class="hidden lg:flex">
            <UserActions />
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
        <div v-if="showSearch">
          <SearchBar />
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
        <div v-if="showMenu">
          <UserActions />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Logo from '@/components/SVGComponents/Logo'
import SearchBar from '@/components/navbarElements/SearchBar'
import UserActions from '@/components/navbarElements/UserActions'

export default {
  name: 'Navbar',
  components: {
    Logo,
    SearchBar,
    UserActions
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      showSearch: false,
      showMenu: false
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
    showSearchDropdown() {
      this.showSearch = !this.showSearch
      this.showMenu = false
    },
    showMenuDropdown() {
      this.showMenu = !this.showMenu
      this.showSearch = false
    }
  }
}
</script>
