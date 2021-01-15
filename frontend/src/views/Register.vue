<template>
  <div class="bg-app-bg min-h-screen pt-12 pb-6 px-2 md:px-0 md:pt-20">
    <div class="bg-app-bg-light max-w-lg mx-auto p-8 my-10 rounded-lg shadow-2xl md:p-12">
      <div>
        <h3 class="text-app-typeface font-bold text-2xl">Join Match Cut</h3>
        <p class="text-app-typeface-alt pt-2">Create your account</p>
      </div>

      <div class="mt-10">
        <form class="flex flex-col" @submit.prevent="register">
          <div class="mb-6 pt-3 rounded bg-app-bg-sec">
            <label class="block text-app-typeface-alt text-sm font-bold mb-2 ml-3" for="username">Username</label>
            <input
              id="username"
              v-model="username"
              type="text"
              class="bg-app-bg-sec rounded w-full text-app-typeface focus:outline-none border-b-4 border-app-bg-sec-light focus:border-app-primary transition duration-500 px-3 pb-3"
              @blur="validateForm"
            />
          </div>

          <div class="mb-6 pt-3 rounded bg-app-bg-sec">
            <label class="block text-app-typeface-alt text-sm font-bold mb-2 ml-3" for="email">Email</label>
            <input id="email" v-model="email" type="text" class="bg-app-bg-sec rounded w-full text-app-typeface focus:outline-none border-b-4 border-app-bg-sec-light focus:border-app-primary transition duration-500 px-3 pb-3" @blur="validateForm" />
          </div>

          <div class="mb-6 pt-3 rounded bg-app-bg-sec">
            <label class="block text-app-typeface-alt text-sm font-bold mb-2 ml-3" for="password1">Password</label>
            <input
              id="password1"
              v-model="password1"
              type="password"
              class="bg-app-bg-sec rounded w-full text-app-typeface focus:outline-none border-b-4 border-app-bg-sec-light focus:border-app-primary transition duration-500 px-3 pb-3"
              @blur="validateForm"
            />
          </div>

          <div class="mb-6 pt-3 rounded bg-app-bg-sec">
            <label class="block text-app-typeface-alt text-sm font-bold mb-2 ml-3" for="password2">Re-enter Password</label>
            <input
              id="password2"
              v-model="password2"
              type="password"
              class="bg-app-bg-sec rounded w-full text-app-typeface focus:outline-none border-b-4 border-app-bg-sec-light focus:border-app-primary transition duration-500 px-3 pb-3"
              @blur="validateForm"
            />
          </div>

          <div class="flex justify-end">
            <a href="#" class="text-sm text-app-accent hover:text-app-accent-light hover:underline mb-6">Forgot your password?</a>
          </div>

          <div v-if="formErrors.length > 0" class="mb-3">
            <div v-for="(error, index) in formErrors" :key="index" class="flex w-full bg-app-error-bg content-center rounded">
              <span class="mx-2 py-1 text-app-error-text"><i class="fas fa-exclamation-triangle"></i> {{ error }}</span>
            </div>
          </div>

          <button class="text-app-typeface-dark bg-app-accent font-bold py-2 rounded shadow-lg hover:shadow-xl hover:bg-app-accent-light transition duration-200" type="submit">Register</button>
        </form>
      </div>
    </div>

    <div class="max-w-lg mx-auto text-center mt-12 mb-6">
      <p class="text-white">Already have an account? <router-link to="/login" class="font-bold hover:underline">Log in</router-link></p>
    </div>
  </div>
</template>

<script>
import utils from '../utils.js'

export default {
  data() {
    return {
      username: '',
      email: '',
      password1: '',
      password2: '',
      formErrors: []
    }
  },
  methods: {
    async register() {
      if ((this.username.length === 0 || this.email.length === 0 || this.password1.length === 0 || this.password2.length === 0) && !this.formErrors.includes('Oops! You missed a field')) {
        this.formErrors = this.formErrors.concat(['Oops! You missed a field'])
      }
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
          Object.entries(err.response.data).forEach(err => {
            this.formErrors = this.formErrors.concat(err[1])
          })
        }
      }
    },
    validateForm() {
      this.formErrors = utils.validateAll(this.username, this.email, this.password1, this.password2)
    }
  }
}
</script>
