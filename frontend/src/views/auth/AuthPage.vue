<template>
  <PageContainer class="bg-poster-collage">
    <Panel :header="header" :sub-header="subHeader" class="m-auto">
      <Login v-if="$route.name === 'Login'" />
      <Register v-if="$route.name === 'Register'" />
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
