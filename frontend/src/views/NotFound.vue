<template>
  <div class="bg-not-found bg-center bg-cover flex flex-col justify-between min-h-screen pt-12 pb-6 px-2">
    <div>
      <p class="text-4xl font-roboto-slab">Whoops!</p>
      <p class="text-xl">That page doesn't exist.</p>
      <router-link to="/">
        <p class="hover:underline hover:text-app-accent">Phone home...</p>
      </router-link>
    </div>
    <div>
      <p class="text-right text-xs text-app-typeface-muted">E.T. the Extra-Terrestrial (1982)</p>
    </div>
  </div>
</template>

<script>
export default {}
</script>
