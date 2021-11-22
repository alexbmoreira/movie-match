<template>
  <div class="w-full m-auto">
    <p v-if="hasLabel" class="block text-app-typeface text-sm font-bold mb-2">
      {{ label }}
    </p>
    <input
      :value="value"
      :type="type"
      class="bg-transparent w-full px-3 pb-2 border-b-2 border-typeface focus:border-app-primary transition duration-500 focus:outline-none"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
      @blur="$emit('blur')"
    >
    <FormErrors :errors="errors" />
  </div>
</template>

<script>
import FormErrors from './FormErrors'

export default {
  name: 'TextField',
  components: {
    FormErrors
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    errors: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    hasLabel() {
      return !!this.label
    }
  }
}
</script>
