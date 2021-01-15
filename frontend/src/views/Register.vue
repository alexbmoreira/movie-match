<template>
  <body class="body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0">
    <header class="max-w-lg mx-auto">
      <a href="#">
        <h1 class="text-4xl font-bold text-white text-center">Match Cut</h1>
      </a>
    </header>

    <div class="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
      <div>
        <h3 class="font-bold text-2xl">Welcome to Match Cut</h3>
        <p class="text-gray-600 pt-2">Sign in to your account.</p>
      </div>

      <section class="mt-10">
        <form class="flex flex-col" method="POST" action="#" @submit.prevent="register">
          <div class="mb-6 pt-3 rounded bg-gray-200">
            <label class="block text-gray-700 text-sm font-bold mb-2 ml-3" for="username">Username</label>
            <input id="username" v-model="username" type="text" class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3" @blur="validateForm" />
          </div>

          <div class="mb-6 pt-3 rounded bg-gray-200">
            <label class="block text-gray-700 text-sm font-bold mb-2 ml-3" for="email">Email</label>
            <input id="email" v-model="email" type="text" class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3" @blur="validateForm" />
          </div>

          <div class="mb-6 pt-3 rounded bg-gray-200">
            <label class="block text-gray-700 text-sm font-bold mb-2 ml-3" for="password1">Password</label>
            <input id="password1" v-model="password1" type="password" class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3" @blur="validateForm" />
          </div>

          <div class="mb-6 pt-3 rounded bg-gray-200">
            <label class="block text-gray-700 text-sm font-bold mb-2 ml-3" for="password2">Re-enter Password</label>
            <input id="password2" v-model="password2" type="password" class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3" @blur="validateForm" />
          </div>

          <div class="flex justify-end">
            <a href="#" class="text-sm text-purple-600 hover:text-purple-700 hover:underline mb-6">Forgot your password?</a>
          </div>

          <div v-if="formErrors.length > 0" class="mb-3">
            <li v-for="(error, index) in formErrors" :key="index" class="ml-6 pt-2 text-red-500">{{ error }}</li>
          </div>

          <button class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">Register</button>
        </form>
      </section>
    </div>

    <div class="max-w-lg mx-auto text-center mt-12 mb-6">
      <p class="text-white">Don't have an account? <a href="#" class="font-bold hover:underline">Sign up</a>.</p>
    </div>

    <footer class="max-w-lg mx-auto flex justify-center text-white">
      <a href="#" class="hover:underline">Contact</a>
      <span class="mx-3">•</span>
      <a href="#" class="hover:underline">Privacy</a>
    </footer>
  </body>
</template>

<script>
import utils from '../utils.js'

export default {
  data() {
    return {
      email: '',
      username: '',
      password1: '',
      password2: '',
      formErrors: []
    }
  },
  methods: {
    async register() {
      if (this.formErrors.length === 0) {
        //adding if so register function is only fired when all inputted info fits validation
        try {
          const payload = {
            username: this.username,
            email: this.email,
            password1: this.password1,
            password2: this.password2
          }
          await this.$store.dispatch('registerUser', payload)
          this.$router.push({ name: 'Home' })
        } catch (err) {
          console.error(err)
        }
      }
    },
    validateForm() {
      this.formErrors = utils.validateAll(this.username, this.email, this.password1, this.password2)
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
