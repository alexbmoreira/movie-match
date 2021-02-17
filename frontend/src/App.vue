<template>
  <div id="app" class="h-full min-h-screen text-app-typeface font-nunito bg-app-bg" :class="path">
    <Navbar />
    <router-view class="pt-20" />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  components: {
    Navbar
  },
  computed: {
    path() {
      if (!['Login', 'Register', 'Not Found'].includes(this.$route.name)) {
        return 'px-4 md:px-10 lg:px-48'
      }
      return ''
    }
  },
  methods: {}
}
</script>
