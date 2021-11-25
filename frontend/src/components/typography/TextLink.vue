<template>
  <div class="inline text-typeface-dark hover:underline hover:text-typeface">
    <router-link v-if="type === 'router'" :to="path">
      {{ text }}
    </router-link>
    <a v-else-if="type === 'external'" :href="path">
      {{ text }}
    </a>
  </div>
</template>

<script>
export default {
  name: 'TextLink',
  props: {
    type: {
      type: String,
      default: 'router',
      validator: function (value) {
        return ['router', 'external'].indexOf(value) !== -1
      }
    },
    path: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
  }
}
</script>
