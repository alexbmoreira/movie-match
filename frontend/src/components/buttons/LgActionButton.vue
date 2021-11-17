<template>
  <button class="text-app-typeface-dark bg-app-accent font-bold p-2 rounded shadow-lg hover:shadow-xl hover:bg-app-accent-light transition duration-200">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'LgActionButton',
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>
