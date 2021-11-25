<template>
  <PageContainer class="bg-poster-collage md:pt-12">
    <Panel :header="header" :sub-header="subHeader" class="m-auto">
      <Login v-if="$route.name === 'Login'" />
      <Register v-else-if="$route.name === 'Register'" />
      <div class="text-center mt-4">
        <p v-if="$route.name === 'Login'" class="text-typeface-dark">
          Don't have an account? <TextLink
            type="router"
            path="/register"
            text="Sign up" 
            class="font-bold"
          />
        </p>
        <p v-else-if="$route.name === 'Register'" class="text-typeface-dark">
          Already have an account? <TextLink
            type="router"
            path="/login"
            text="Log in"
            class="font-bold"
          />
        </p>
      </div>
    </Panel>
  </PageContainer>
</template>

<script>
import PageContainer from '@/components/containers/PageContainer'
import Panel from '@/components/containers/Panel'
import TextLink from '@/components/typography/TextLink'
import Login from './Login'
import Register from './Register'

export default {
  name: 'AuthPage',
  components: {
    PageContainer,
    Panel,
    TextLink,
    Login,
    Register
  },
  computed: {
    header() {
      return this.$route.name === 'Login' ? 'Welcome back' : 'Join Match Cut'
    },
    subHeader() {
      return this.$route.name === 'Login' ? 'Sign in to your account' : 'Create your account'
    }
  }
}
</script>
