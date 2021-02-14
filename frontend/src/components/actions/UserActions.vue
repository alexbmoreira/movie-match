<template>
  <div class="flex">
    <div v-if="!isLoggedIn" class="flex my-auto mx-auto space-x-4">
      <button class="bg-transparent rounded border border-app-typeface w-20 px-4 py-1 transition duration-400 ease-in-out hover:bg-app-primary hover:border-opacity-0" @click.prevent="goLogin()">Log In</button>
      <button class="bg-transparent w-20 px-1 py-1 transition duration-400 ease-in-out hover:text-app-primary" @click.prevent="goRegister()">Register</button>
    </div>
    <div v-else class="flex my-auto mx-auto space-x-1">
      <div class="flex rounded-full bg-app-bg-sec w-8 h-8" :class="hideOnHome">
        <p class="mx-auto my-auto uppercase">{{ userInitial }}</p>
      </div>
      <button class="bg-transparent w-24 px-1 py-1 transition duration-400 ease-in-out hover:text-app-primary" @click.prevent="logout()">Log Out</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserActions',
  data() {
    return {
      user: {}
    }
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn
    },
    userInitial: function() {
      return this.user.username.substring(0, 1)
    },
    hideOnHome() {
      if (this.$route.name !== 'Home') {
        return 'flex'
      }
      return 'hidden'
    }
  },
  created() {
    this.user = this.$store.getters.user
  },
  methods: {
    goLogin() {
      this.$emit('route')
      this.$router.push({ name: 'Login' }).catch(() => {})
    },
    goRegister() {
      this.$emit('route')
      this.$router.push({ name: 'Register' }).catch(() => {})
    },
    async logout() {
      try {
        this.$emit('route')
        await this.$store.dispatch('logoutUser')
        this.$router.push({ name: 'Login' })
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>
