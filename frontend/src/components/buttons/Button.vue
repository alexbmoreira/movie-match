<template>
  <button :class="`flex-grow whitespace-nowrap p-2 focus:outline-none ${style}`" @click="onClick()">
    <slot />
  </button>
</template>
<script>
export default {
  name: 'Button',
  props: {
    trait: {
      type: String,
      default: 'action',
      validator: function (value) {
        return ['action', 'bordered', 'transparent'].indexOf(value) !== -1
      }
    }
  },
  computed: {
    style() {
      switch (this.trait) {
      case 'action':
        return 'rounded bg-app-accent text-app-typeface-dark font-bold shadow-lg transition duration-300 hover:shadow-xl hover:bg-app-accent-light'
      case 'bordered':
        return 'rounded border bg-transparent border-app-typeface transition duration-300 ease-in-out hover:bg-app-primary hover:border-opacity-0'
      case 'transparent':
        return 'bg-transparent transition duration-400 ease-in-out hover:text-app-primary'
      default:
        throw `${this.trait} is not a valid trait`
      }
    }
  },
  methods: {
    onClick() {
      this.$emit('onClick')
    }
  }
}
</script>

