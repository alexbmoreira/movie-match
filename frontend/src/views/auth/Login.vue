<template>
  <FormLayout>
    <FormRow>
      <TextField
        v-model="username"
        :errors="formErrors.username"
        label="Username"
      />
    </FormRow>
    <FormRow>
      <TextField
        v-model="password"
        type="password"
        :errors="formErrors.password"
        label="Password"
      />
    </FormRow>
    <div class="flex justify-end">
      <a href="#" class="text-sm mb-6 hover:text-accent hover:underline">Forgot your password?</a>
    </div>
    <Button @onClick="login">
      Sign In
    </Button>
  </FormLayout>
</template>

<script>
import FormLayout from '@/components/forms/FormLayout'
import FormRow from '@/components/forms/FormRow'
import Button from '@/components/buttons/Button'
import TextField from '@/components/inputs/TextField'

export default {
  name: 'Login',
  components: {
    FormLayout,
    FormRow,
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
        this.$router.push({ name: 'Home' })
      } else {
        this.formErrors = errors
      }
    }
  },
}
</script>
