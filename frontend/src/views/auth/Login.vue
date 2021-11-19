<template>
  <div class="mt-10">
    <form class="flex flex-col" @submit.prevent="login">
      <div class="mb-6 pt-3">
        <label class="block text-app-typeface-alt text-sm font-bold mb-2 ml-3" for="username">Username</label>
        <TextField id="username" v-model="username" :errors="formErrors.username" />
      </div>
      <div class="mb-6 pt-3">
        <label class="block text-app-typeface-alt text-sm font-bold mb-2 ml-3" for="password">Password</label>
        <TextField
          id="password"
          v-model="password"
          type="password"
          :errors="formErrors.password"
        />
      </div>
      <div class="flex justify-end">
        <a href="#" class="text-sm mb-6 text-app-accent hover:text-app-accent-light hover:underline">Forgot your password?</a>
      </div>
      <Button>Sign In</Button>
    </form>
  </div>
</template>

<script>
import Button from '@/components/buttons/Button'
import TextField from '@/components/inputs/TextField'

export default {
  name: 'Login',
  components: {
    Button,
    TextField
  },
  data() {
    return {
      username: '',
      password: '',
      formErrors: {}
    }
  },
  methods: {
    async login() {
      const payload = {
        username: this.username,
        password: this.password
      }
      const {errors} = await this.$store.dispatch('loginUser', payload)

      if(!errors) {
        await this.$store.dispatch('setUser')
        this.$router.push({ name: 'Home' })
      } else {
        this.formErrors = errors
      }
    }
  }
}
</script>
