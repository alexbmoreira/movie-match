<template>
  <input
    :value="value"
    type="text"
    class="bg-transparent w-full px-3 pb-2 border-b-2 border-app-bg-sec-light focus:border-app-primary transition duration-500 focus:outline-none"
    @input="$emit('input', $event.target.value)"
    @blur="$emit('blur')"
  >
</template>

<script>
export default {
  name: 'TextField',
  props: {
    value: {
      type: String,
      default: ''
    }
  }
}
</script>
