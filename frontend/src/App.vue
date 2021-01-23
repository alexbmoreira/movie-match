<template>
  <div id="app" class="text-app-typeface font-nunito bg-app-bg">
    <Navbar />
    <router-view />
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
