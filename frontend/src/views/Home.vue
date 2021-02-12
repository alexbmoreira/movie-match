<template>
  <div class="bg-app-bg">
    <div v-if="isLoggedIn" class="flex flex-col p-4">
      <div class="mx-auto mb-2">
        <p class="text-xl text-app-typeface-muted">Welcome back,</p>
      </div>
      <div class="flex flex-col mx-auto mb-6">
        <!-- Profile Pic -->
        <div class="flex mx-auto rounded-full bg-app-bg-sec w-20 h-20">
          <p class="mx-auto my-auto text-4xl">{{ user.username.substring(0, 1).toUpperCase() }}</p>
        </div>
        <p class="font-roboto-slab text-2xl">{{ user.username }}</p>
      </div>
      <div class="flex mb-2">
        <p class="text-lg">Your Friends:</p>
      </div>
      <!-- Friends list -->
      <div class="flex flex-col divide-y divide-app-bg-light">
        <div v-for="friend in friends_list" :key="friend.id" class="flex justify-between py-2">
          <!-- Friend -->
          <div class="flex space-x-2">
            <!-- Friend Pic -->
            <div class="flex rounded-full bg-app-bg-sec w-14 h-14">
              <p class="mx-auto my-auto text-xl">{{ friend.username.substring(0, 1).toUpperCase() }}</p>
            </div>
            <div class="my-auto">
              <p class="font-roboto-slab text-lg">{{ friend.username }}</p>
            </div>
          </div>
          <div class="flex my-auto space-x-2">
            <!-- Matches -->
            <div class="flex rounded-full bg-app-like w-8 h-8">
              <div class="mx-auto my-auto"><i class="fas fa-heart"></i></div>
            </div>
            <!-- Watch -->
            <div class="flex rounded-full bg-app-accent w-8 h-8">
              <div class="mx-auto my-auto"><i class="fas fa-ticket-alt"></i></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex flex-col mx-auto my-auto mt-8">
      <div class="text-center mb-10">
        <p class="font-roboto-slab text-4xl mb-4">Have a no-fight movie night!</p>
        <p class="text-lg">Decide what to watch with friends based on your personal watchlists.</p>
      </div>
      <div class="flex flex-col mx-auto">
        <router-link to="/register" class="mx-auto mb-2">
          <button class="text-app-typeface-dark font-bold p-2 rounded shadow-lg bg-app-accent hover:bg-app-accent-light hover:shadow-xl transition duration-200">
            Create an account
          </button>
        </router-link>
        <router-link to="/login" class="text-app-typeface text-xs hover:underline">Or sign in if you already know what's up</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import friendsAPI from '../api/friends'

export default {
  name: 'Home',
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
