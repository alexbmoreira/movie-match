<template>
  <div class="bg-poster-collage bg-center min-h-screen pt-12 pb-6 px-2 md:px-0 md:pt-20">
    <div class="bg-app-bg-light max-w-lg mx-auto my-20 p-8 rounded-lg shadow-2xl md:p-12">
      <div>
        <h3 class="font-bold text-2xl">
          Welcome back
        </h3>
        <p class="text-app-typeface-alt pt-2">
          Sign in to your account
        </p>
      </div>
      <div class="mt-10">
        <form class="flex flex-col" @submit.prevent="login">
          <div class="mb-6 pt-3">
            <label class="block text-app-typeface-alt text-sm font-bold mb-2 ml-3" for="username">Username</label>
            <TextField id="username" v-model="username" @blur="clearFields" />
          </div>
          <div class="mb-6 pt-3">
            <label class="block text-app-typeface-alt text-sm font-bold mb-2 ml-3" for="password">Password</label>
            <TextField
              id="password"
              v-model="password"
              type="password"
              @blur="clearFields"
            />
          </div>
          <div class="flex justify-end">
            <a href="#" class="text-sm mb-6 text-app-accent hover:text-app-accent-light hover:underline">Forgot your password?</a>
          </div>
          <div v-if="formErrors.length > 0" class="mb-3 space-y-2">
            <div v-for="(error, index) in formErrors" :key="index" class="flex w-full bg-app-error-bg content-center rounded text-sm">
              <span class="mx-2 py-1 text-app-error-text"><i class="fas fa-exclamation-triangle" /> {{ error }}</span>
            </div>
          </div>
          <LgActionButton text="Sign In" />
        </form>
      </div>
    </div>
    <div class="max-w-lg mx-auto text-center mt-12 mb-6">
      <p>
        Don't have an account? <router-link to="/register" class="font-bold hover:underline">
          Sign up
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import LgActionButton from '@/components/actions/LgActionButton'
import TextField from '@/components/actions/TextField'

export default {
  components: {
    LgActionButton,
    TextField
  },
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
