<template lang="">
  <img
    :class="`${sizingClasses()} object-left object-cover border-2 rounded lg:my-auto`"
    :src="posterPath"
    alt=""
  >
</template>

<script>
export default {
  props: {
    posterPath: {
      type: String,
      default: require('@/assets/images/missing_poster.png')
    },
    size: {
      type: String,
      default: 'lg'
    }
  },
  methods: {
    sizingClasses() {
      switch (this.size) {
      case 'lg':
        return 'h-poster-sm w-poster-sm lg:h-poster-md lg:w-poster-md'
      case 'md':
        return 'h-poster-sm w-poster-sm'
      default:
        throw `${this.size} is not a valid poster size`
      }
    }
  }
}
</script>
