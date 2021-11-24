<template>
  <div class="bg-panel max-w-lg m-4 p-6 rounded-lg shadow-2xl md:p-8">
    <div class="mb-8">
      <h3 class="font-bold text-2xl">
        {{ header }}
      </h3>
      <p class="text-typeface-dark pt-2">
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
