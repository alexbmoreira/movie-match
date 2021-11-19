<template>
  <PageContainer class="bg-poster-collage md:pt-12">
    <Panel :header="header" :sub-header="subHeader" class="m-auto">
      <Login v-if="$route.name === 'Login'" />
      <Register v-else-if="$route.name === 'Register'" />
      <div class="text-center mt-4">
        <p v-if="$route.name === 'Login'">
          Don't have an account? <router-link to="/register" class="font-bold hover:underline">
            Sign up
          </router-link>
        </p>
        <p v-else-if="$route.name === 'Register'">
          Already have an account? <router-link to="/login" class="font-bold hover:underline">
            Log in
          </router-link>
        </p>
      </div>
    </Panel>
  </PageContainer>
</template>

<script>
import PageContainer from '@/components/containers/PageContainer'
import Panel from '@/components/containers/Panel'
import Login from './Login'
import Register from './Register'

export default {
  name: 'AuthPage',
  components: {
    PageContainer,
    Panel,
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
