<template>
  <div class="flex mx-auto rounded-full bg-app-bg-sec cursor-pointer" :class="`w-${picSize} h-${picSize}`" @click="goUser">
    <p class="mx-auto my-auto uppercase" :class="textSize">{{ userInitial }}</p>
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
      default: function() {
        return {}
      }
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
  },
  methods: {
    goUser() {
      this.$router
        .push({
          name: 'Profile',
          params: {
            username: this.user.username,
            id: this.user.id
          }
        })
        .catch(() => {})
    }
  }
}
</script>
