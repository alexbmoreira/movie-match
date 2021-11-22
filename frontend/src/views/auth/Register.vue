<template>
  <FormLayout>
    <FormRow>
      <TextField
        id="username"
        v-model="username"
        :errors="formErrors.username"
        label="Username"
      />
    </FormRow>
    <FormRow>
      <TextField
        id="email"
        v-model="email"
        :errors="formErrors.email"
        label="Email"
      />
    </FormRow>
    <FormRow>
      <TextField
        id="password1"
        v-model="password1"
        type="password"
        :errors="formErrors.password1"
        label="Password"
      />
    </FormRow>
    <FormRow>
      <TextField
        id="password2"
        v-model="password2"
        type="password"
        :errors="formErrors.password2"
        label="Re-enter Password"
      />
    </FormRow>
    <Button @onClick="register">
      Register
    </Button>
  </FormLayout>
</template>

<script>
import FormLayout from '@/components/forms/FormLayout'
import FormRow from '@/components/forms/FormRow'
import Button from '@/components/buttons/Button'
import TextField from '@/components/inputs/TextField'

export default {
  name: 'Register',
  components: {
    FormLayout,
    FormRow,
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
        this.$router.push({ name: 'Home' })
      } else {
        this.formErrors = errors
        console.log(this.formErrors)
      }
    }
  }
}
</script>
