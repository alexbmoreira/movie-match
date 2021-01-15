<template>
  <div class="bg-app-bg min-h-screen pt-12 pb-6 px-4 md:pt-20 md:px-0">
    <div class="bg-app-bg-light max-w-lg mx-auto p-8 my-10 rounded-lg shadow-2xl md:p-12">
      <div>
        <h3 class="text-app-typeface font-bold text-2xl">Welcome back</h3>
        <p class="text-app-typeface-alt pt-2">Sign in to your account</p>
      </div>

      <div class="mt-10">
        <form class="flex flex-col" @submit.prevent="login">
          <div class="mb-6 pt-3">
            <label class="block text-app-typeface-alt text-sm font-bold mb-2 ml-3" for="username">Username</label>
            <input id="username" v-model="username" type="text" class="bg-transparent w-full px-3 text-app-typeface border-b-2 border-app-bg-sec-light focus:border-app-primary transition duration-500 focus:outline-none" @blur="clearFields" />
          </div>

          <div class="mb-6 pt-3">
            <label class="block text-app-typeface-alt text-sm font-bold mb-2 ml-3" for="password">Password</label>
            <input id="password" v-model="password" type="password" class="bg-transparent w-full px-3 text-app-typeface border-b-2 border-app-bg-sec-light focus:border-app-primary transition duration-500 focus:outline-none" @blur="clearFields" />
          </div>
          <div class="flex justify-end">
            <a href="#" class="text-sm mb-6 text-app-accent hover:text-app-accent-light hover:underline">Forgot your password?</a>
          </div>

          <div v-if="formErrors.length > 0" class="mb-3 space-y-2">
            <div v-for="(error, index) in formErrors" :key="index" class="flex w-full bg-app-error-bg content-center rounded text-sm">
              <span class="mx-2 py-1 text-app-error-text"><i class="fas fa-exclamation-triangle"></i> {{ error }}</span>
            </div>
          </div>

          <button class="text-app-typeface-dark font-bold py-2 rounded shadow-lg bg-app-accent hover:bg-app-accent-light hover:shadow-xl transition duration-200" type="submit">Sign In</button>
        </form>
      </div>
    </div>

    <div class="max-w-lg mx-auto text-center mt-12 mb-6">
      <p class="text-app-typeface">Don't have an account? <router-link to="/register" class="font-bold hover:underline">Sign up</router-link></p>
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
