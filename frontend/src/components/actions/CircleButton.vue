<template>
  <div class="flex mx-auto rounded-full w-8 h-8 cursor-pointer" :class="'bg-' + color">
    <div class="mx-auto my-auto"><i :class="'fas fa-' + icon"></i></div>
  </div>
</template>

<script>
export default {
  name: 'CircleButton',
  props: {
    icon: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    }
  }
}
</script>
