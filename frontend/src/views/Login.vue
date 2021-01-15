<template>
  <div class="body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0">
    <div class="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
      <div>
        <h3 class="font-bold text-2xl">Welcome to Match Cut</h3>
        <p class="text-gray-600 pt-2">Sign in to your account.</p>
      </div>

      <div class="mt-10">
        <form class="flex flex-col" @submit.prevent="login">
          <div class="mb-6 pt-3 rounded bg-gray-200">
            <label class="block text-gray-700 text-sm font-bold mb-2 ml-3" for="username">Email / Username</label>
            <input id="username" v-model="username" type="text" class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3" @blur="clearFields" />
          </div>
          <div class="mb-6 pt-3 rounded bg-gray-200">
            <label class="block text-gray-700 text-sm font-bold mb-2 ml-3" for="password">Password</label>
            <input id="password" v-model="password" type="password" class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3" @blur="clearFields" />
          </div>
          <div class="flex justify-end">
            <a href="#" class="text-sm text-purple-600 hover:text-purple-700 hover:underline mb-6">Forgot your password?</a>
          </div>

          <div v-if="formErrors.length > 0" class="mb-3">
            <li v-for="(error, index) in formErrors" :key="index" class="ml-6 pt-2 text-red-500">{{ error }}</li>
          </div>

          <button class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">Sign In</button>
        </form>
      </div>
    </div>

    <div class="max-w-lg mx-auto text-center mt-12 mb-6">
      <p class="text-white">Don't have an account? <router-link to="/register" class="font-bold hover:underline">Sign up</router-link>.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      formErrors: []
    }
  },
  methods: {
    async login() {
      if (this.username.length === 0 || this.password.length === 0) {
        this.formErrors = ['Oops! You missed a field']
      } else {
        this.formErrors = []
        try {
          const payload = {
            username: this.username,
            password: this.password
          }
          await this.$store.dispatch('loginUser', payload)
          this.$router.push({ name: 'Home' })
        } catch (err) {
          Object.entries(err.response.data).forEach(err => {
            this.formErrors = this.formErrors.concat(err[1])
          })
        }
      }
    },
    clearFields() {
      if (this.username.length > 0 && this.password.length > 0) {
        this.formErrors = []
      }
    }
  }
}
</script>

<style scoped>
.body-bg {
  background-color: #9921e8;
  background-image: linear-gradient(315deg, #9921e8 0%, #5f72be 74%);
}
</style>
