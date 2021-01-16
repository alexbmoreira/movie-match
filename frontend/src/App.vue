<template>
  <div id="app">
      <Navbar />
    <div id="nav">
      <router-link to="/">Home</router-link> | <router-link to="/about">About</router-link> | <router-link to="/register">Register</router-link> | <router-link to="/login">Login</router-link> |
      <button @click.prevent="logout">Logout</button>
    </div>
    <router-view />
  </div>
</template>

<script>

import Navbar from '@/components/Navbar'

export default {
    components: {
        Navbar
    },
  methods: {
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
