<template>
  <div class="bg-app-bg-light max-w-lg m-4 p-6 rounded-lg shadow-2xl md:p-8">
    <div>
      <h3 class="font-bold text-2xl">
        {{ header }}
      </h3>
      <p class="text-app-typeface-alt pt-2">
        {{ subHeader }}
      </p>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Panel',
  props: {
    header: {
      type: String,
      default: null
    },
    subHeader: {
      type: String,
      default: null
    }
  }
}
</script>
