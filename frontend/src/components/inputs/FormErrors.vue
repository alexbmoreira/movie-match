<template lang="">
  <div v-if="errors.length > 0" class="mt-2 space-y-2">
    <div v-for="(error, index) in errors" :key="index" class="flex w-full content-center rounded text-xs">
      <span class="mx-2 py-1 text-error-text"><i class="fas fa-exclamation-triangle" /> {{ error }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FormErrors',
  props: {
    errors: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style lang="">
  
</style>
