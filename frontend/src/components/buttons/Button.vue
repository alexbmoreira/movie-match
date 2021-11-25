<template>
  <button :class="`flex-grow whitespace-nowrap p-2 focus:outline-none ${style} ${fontSizeStyle}`" @click="onClick()">
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
    },
    fontSize: {
      type: String,
      default: 'md',
      validator: function (value) {
        return ['sm', 'md', 'lg', 'xl', '2xl'].indexOf(value) !== -1
      }
    }
  },
  computed: {
    style() {
      switch (this.trait) {
      case 'action':
        return 'rounded bg-primary text-typeface font-bold shadow-lg transition duration-300 hover:bg-primary-light active:bg-primary-dark'
      case 'bordered':
        return 'rounded border bg-transparent border-typeface transition duration-300 ease-in-out hover:bg-primary hover:border-opacity-0'
      case 'transparent':
        return 'bg-transparent transition duration-400 ease-in-out hover:text-typeface-light'
      default:
        throw `${this.trait} is not a valid trait`
      }
    },
    fontSizeStyle() {
      switch (this.fontSize) {
      case 'sm':
        return 'text-sm'
      case 'md':
        return ''
      case 'lg':
        return 'text-lg'
      case 'xl':
        return 'text-xl'
      case '2xl':
        return 'text-2xl'
      default:
        throw `${this.fontSize} is not a valid font size`
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

