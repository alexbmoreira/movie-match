<template>
  <div class="bg-poster-collage bg-center min-h-screen pt-12 pb-6 px-2 md:px-0 md:pt-20">
    <Panel header="Join Match Cut" sub-header="Create your account">
      <div class="mt-10">
        <form class="flex flex-col" @submit.prevent="register">
          <div class="mb-6 pt-3">
            <label class="block text-app-typeface-alt text-sm font-bold mb-2 ml-3" for="username">Username</label>
            <TextField id="username" v-model="username" @blur="validateForm" />
          </div>
          <div class="mb-6 pt-3">
            <label class="block text-app-typeface-alt text-sm font-bold mb-2 ml-3" for="email">Email</label>
            <TextField id="email" v-model="email" @blur="validateForm" />
          </div>
          <div class="mb-6 pt-3">
            <label class="block text-app-typeface-alt text-sm font-bold mb-2 ml-3" for="password1">Password</label>
            <TextField
              id="password1"
              v-model="password1"
              type="password"
              @blur="validateForm"
            />
          </div>
          <div class="mb-6 pt-3">
            <label class="block text-app-typeface-alt text-sm font-bold mb-2 ml-3" for="password2">Re-enter Password</label>
            <TextField
              id="password2"
              v-model="password2"
              type="password"
              @blur="validateForm"
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
    </Panel>
    <div class="max-w-lg mx-auto text-center mt-12 mb-6">
      <p>
        Already have an account? <router-link to="/login" class="font-bold hover:underline">
          Log in
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import utils from '../../utils.js'
import Button from '@/components/buttons/Button'
import Panel from '@/components/containers/Panel'
import TextField from '@/components/inputs/TextField'

export default {
  components: {
    Button,
    Panel,
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
