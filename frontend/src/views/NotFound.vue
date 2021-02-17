<template>
  <div class="bg-not-found bg-center bg-cover flex flex-col min-h-screen pt-12 pb-6 px-2">
    <p class="text-4xl font-roboto-slab">Whoops!</p>
    <p class="text-xl">That page doesn't exist.</p>
    <router-link to="/">
      <p class="hover:underline hover:text-app-accent">Phone home...</p>
    </router-link>
  </div>
</template>

<script>
export default {}
</script>
