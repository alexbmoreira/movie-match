<template>
  <div id="app" class="h-full min-h-screen text-app-typeface font-nunito bg-app-bg px-4 md:px-10 lg:px-60">
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
  methods: {}
}
</script>
