<template>
  <div class="bg-app-bg">
    <div v-if="isLoggedIn" class="flex flex-col py-4">
      <div class="mx-auto mb-2">
        <p class="text-xl text-app-typeface-muted">Welcome back,</p>
      </div>
      <div class="flex flex-col mx-auto mb-6">
        <!-- Profile Pic -->
        <div class="flex mx-auto rounded-full bg-app-bg-sec w-20 h-20">
          <p class="mx-auto my-auto text-4xl uppercase">{{ user.username.substring(0, 1) }}</p>
        </div>
        <p class="font-roboto-slab text-2xl">{{ user.username }}</p>
      </div>
      <div class="flex mb-2">
        <p class="text-lg">Your Friends:</p>
      </div>
      <!-- Friends list -->
      <div class="flex flex-col divide-y divide-app-bg-light">
        <FriendItem v-for="friend in friends_list" :key="friend.id" :friend="friend" />
      </div>
    </div>
    <div v-else class="flex flex-col mx-auto my-auto mt-8">
      <div class="text-center mb-10">
        <p class="font-roboto-slab text-4xl mb-4">Have a no-fight movie night!</p>
        <p class="text-lg">Decide what to watch with friends based on your personal watchlists.</p>
      </div>
      <div class="flex flex-col mx-auto">
        <router-link to="/register" class="mx-auto mb-2">
          <LgActionButton text="Create an Account" />
        </router-link>
        <router-link to="/login" class="text-app-typeface text-xs hover:underline">Or sign in if you already know what's up</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import friendsAPI from '@/api/friends'
import FriendItem from '@/components/lists/FriendItem'
import LgActionButton from '@/components/LgActionButton'

export default {
  name: 'Home',
  components: {
    FriendItem,
    LgActionButton
  },
  data() {
    return {
      friends_list: [],
      user: {}
    }
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn
    }
  },
  created() {
    this.user = this.$store.getters.user
    this.friends()
  },
  methods: {
    async friends() {
      if (this.$store.getters.isLoggedIn) {
        var result = await friendsAPI.getFriends(this.user.id)
        this.friends_list = result.friends
      }
    }
  }
}
</script>
