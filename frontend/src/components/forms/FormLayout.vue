<template>
  <div ref="parentRef" class="flex flex-col">
    <!-- <FormRow v-for="(row, index) in $refs.formRow" :key="index" /> -->
    <slot ref="slot" />
  </div>
</template>

<script>
// import FormRow from './FormRow'

export default {
  name: 'FormLayout',
  components: {
    // FormRow
  }
}
</script>
