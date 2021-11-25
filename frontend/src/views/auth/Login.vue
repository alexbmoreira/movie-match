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
    <div class="flex justify-end mb-6 text-sm">
      <TextLink type="external" path="#" text="Forgot your password?" />
    </div>
    <Button @onClick="login">
      Sign In
    </Button>
  </FormLayout>
</template>

<script>
import FormLayout from '@/components/forms/FormLayout'
import FormRow from '@/components/forms/FormRow'
import TextLink from '@/components/typography/TextLink'
import Button from '@/components/buttons/Button'
import TextField from '@/components/inputs/TextField'

export default {
  name: 'Login',
  components: {
    FormLayout,
    FormRow,
    TextLink,
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
