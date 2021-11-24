<template>
  <div>
    <p v-if="hasLabel" class="mb-2 text-lg">
      {{ label }}
    </p>
    <div class="flex flex-col divide-y divide-typeface">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'List',
  props: {
    label: {
      type: String,
      default: ''
    }
  },
  computed: {
    hasLabel() {
      return !!this.label
    }
  }
}
</script>
