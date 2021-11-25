<template>
  <div id="app" class="flex flex-col h-screen text-typeface font-nunito bg-background">
    <Navbar />
    <router-view class="flex-grow" />
  </div>
</template>

<script>
import Navbar from '@/components/navbar/Navbar'

export default {
  components: {
    Navbar
  },
  methods: {}
}
</script>
