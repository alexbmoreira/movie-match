<template>
  <div class="flex m-auto rounded-full bg-panel cursor-pointer" :class="`w-${picSize} h-${picSize}`">
    <p class="m-auto uppercase" :class="textSize">
      {{ userInitial }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'ProfilePicture',
  props: {
    picSize: {
      type: String,
      default: '14'
    },
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      textSize: ''
    }
  },
  computed: {
    userInitial: function() {
      return this.user.username.substring(0, 1)
    }
  },
  created() {
    if (this.picSize === '8') {
      this.textSize = ''
    } else if (this.picSize === '14') {
      this.textSize = 'text-xl'
    } else if (this.picSize === '20') {
      this.textSize = 'text-4xl'
    }
  }
}
</script>
