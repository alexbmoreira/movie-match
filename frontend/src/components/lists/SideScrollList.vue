<template>
  <div>
    <p v-if="hasLabel" class="mb-2 text-lg">
      {{ label }}
    </p>
    <div class="flex space-x-4 overflow-x-scroll">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideScrollList',
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
