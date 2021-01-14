<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/register">Register</router-link> |
      <router-link to="/login">Login</router-link> |
      <button @click.prevent="logout">Logout</button>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
    methods: {
        async logout() {
            try {
                await this.$store.dispatch("logoutUser");
                this.$router.push({ name: "Login" });
            } catch (err) {
                console.error(err);
            }
        }
    }
}
</script>
