<template>
  <div class="flex">
    <div v-if="!isLoggedIn" class="flex m-auto space-x-4">
      <Button trait="bordered" @onClick="goLogin">
        Log In
      </Button>
      <Button trait="transparent" @onClick="goRegister">
        Register
      </Button>
    </div>
    <div v-else class="flex m-auto space-x-1">
      <div :class="hideOnHome">
        <router-link :to="{ name: 'Profile', params: { username: user.username, id: user.id } }">
          <ProfilePicture pic-size="8" :user="user" />
        </router-link>
      </div>
      <Button trait="transparent" @onClick="logout">
        Log Out
      </Button>
    </div>
  </div>
</template>

<script>
import ProfilePicture from '@/components/common/ProfilePicture'
import Button from '@/components/buttons/Button'

export default {
  name: 'UserActions',
  components: {
    ProfilePicture,
    Button
  },
  data() {
    return {
      user: {}
    }
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn
    },
    hideOnHome() {
      if (this.$route.name !== 'Home') {
        return 'flex'
      }
      return 'hidden'
    }
  },
  created() {
    this.user = this.$store.getters.user
  },
  methods: {
    goLogin() {
      this.$emit('route')
      this.$router.push({ name: 'Login' }).catch(() => {})
    },
    goRegister() {
      this.$emit('route')
      this.$router.push({ name: 'Register' }).catch(() => {})
    },
    async logout() {
      try {
        this.$emit('route')
        await this.$store.dispatch('logoutUser')
        this.$router.push({ name: 'Login' })
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>
