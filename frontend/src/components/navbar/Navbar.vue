<template>
  <div class="p-4 shadow-lg">
    <!-- Logo text or image -->
    <div class="flex items-center justify-between">
      <router-link to="/" class="cursor-pointer w-60">
        <Logo />
      </router-link>
      <div class="flex space-x-4 ml-5 lg:w-full">
        <div class="hidden lg:w-full lg:flex">
          <SearchBar />
        </div>
        <div class="hidden lg:flex">
          <UserActions />
        </div>
      </div>
      <div class="flex space-x-2 lg:hidden">
        <Button trait="transparent" font-size="2xl" @onClick="showSearchDropdown">
          <i class="fas fa-search" />
        </Button>
        <Button trait="transparent" font-size="2xl" @onClick="showMenuDropdown">
          <i class="fa fa-bars" />
        </Button>
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
      <div v-if="showSearch" class="mt-4">
        <SearchBar @search="hideDropdowns" />
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
      <div v-if="showMenu" class="mt-4">
        <UserActions @route="hideDropdowns" />
      </div>
    </transition>
  </div>
</template>

<script>
import Logo from '@/components/SVGComponents/Logo'
import SearchBar from './SearchBar'
import UserActions from './UserActions'
import Button from '@/components/buttons/Button'

export default {
  name: 'Navbar',
  components: {
    Logo,
    SearchBar,
    UserActions,
    Button
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
      if (this.windowWidth > 1023) {
        this.hideDropdowns()
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
    hideDropdowns() {
      this.showMenu = false
      this.showSearch = false
    }
  }
}
</script>
