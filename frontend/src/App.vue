<template>
  <div id="app" class="text-app-typeface font-nunito bg-app-bg">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from '@/components/navbar/Navbar'

export default {
  components: {
    Navbar
  },
  computed: {
    // path() {
    //   if (!['Login', 'Register', 'Not Found'].includes(this.$route.name)) {
    //     return 'px-4 md:px-10 lg:px-48'
    //   }
    //   return ''
    // }
  },
  methods: {}
}
</script>
