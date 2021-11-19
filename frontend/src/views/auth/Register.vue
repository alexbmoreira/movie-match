<template>
  <div>
    <div class="mt-10">
      <form class="flex flex-col" @submit.prevent="register">
        <div class="mb-6 pt-3">
          <label class="block text-app-typeface-alt text-sm font-bold mb-2 ml-3" for="username">Username</label>
          <TextField id="username" v-model="username" :errors="formErrors.username" />
        </div>
        <div class="mb-6 pt-3">
          <label class="block text-app-typeface-alt text-sm font-bold mb-2 ml-3" for="email">Email</label>
          <TextField id="email" v-model="email" :errors="formErrors.email" />
        </div>
        <div class="mb-6 pt-3">
          <label class="block text-app-typeface-alt text-sm font-bold mb-2 ml-3" for="password1">Password</label>
          <TextField
            id="password1"
            v-model="password1"
            type="password"
            :errors="formErrors.password1"
          />
        </div>
        <div class="mb-6 pt-3">
          <label class="block text-app-typeface-alt text-sm font-bold mb-2 ml-3" for="password2">Re-enter Password</label>
          <TextField
            id="password2"
            v-model="password2"
            type="password"
            :errors="formErrors.password2"
          />
        </div>
        <div v-if="formErrors.length > 0" class="mb-3 space-y-2">
          <div v-for="(error, index) in formErrors" :key="index" class="flex w-full bg-app-error-bg content-center rounded text-sm">
            <span class="mx-2 py-1 text-app-error-text"><i class="fas fa-exclamation-triangle" /> {{ error }}</span>
          </div>
        </div>
        <Button>Register</Button>
      </form>
    </div>
    <div class="text-center mt-4">
      <p>
        Already have an account? <router-link to="/login" class="font-bold hover:underline">
          Log in
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import Button from '@/components/buttons/Button'
import TextField from '@/components/inputs/TextField'

export default {
  name: 'Register',
  components: {
    Button,
    TextField
  },
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
      const payload = {
        username: this.username,
        email: this.email,
        password1: this.password1,
        password2: this.password2
      }
      const {errors} = await this.$store.dispatch('registerUser', payload)

      if(!errors) {
        await this.$store.dispatch('setUser')
        this.$router.push({ name: 'Home' })
      } else {
        this.formErrors = errors
        console.log(this.formErrors)
      }
    }
  }
}
</script>
