<template>
  <div class="flex">
    <div v-show="!isLoggedIn" class="flex my-auto mx-auto space-x-4">
      <button class="bg-transparent rounded border border-app-typeface w-20 px-4 py-1 transition duration-400 ease-in-out hover:bg-app-primary hover:border-opacity-0" @click.prevent="goLogin()">Log In</button>
      <button class="bg-transparent px-2 py-1 transition duration-400 ease-in-out hover:text-app-primary" @click.prevent="goRegister()">Register</button>
    </div>
    <div v-show="isLoggedIn" class="flex my-auto mx-auto space-x-4">
      <button class="bg-transparent px-2 py-1 transition duration-400 ease-in-out hover:text-app-primary" @click.prevent="logout()">Log Out</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserActions',
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn
    }
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
        await this.$store.dispatch('logoutUser')
        this.$emit('route')
        this.$router.push({ name: 'Login' })
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>
