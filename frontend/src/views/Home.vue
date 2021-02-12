<template>
  <div class="bg-app-bg">
    <div v-if="isLoggedIn" class="flex flex-col p-4">
      <div class="flex flex-col mx-auto mb-6">
        <!-- Profile Pic -->
        <div class="flex mx-auto rounded-full bg-app-bg-sec w-20 h-20">
          <p class="mx-auto my-auto text-4xl">{{ user.username }}</p>
        </div>
        <p class="font-roboto-slab text-2xl">{{ user.username }}</p>
      </div>
      <div class="flex mb-4">
        <p class="text-lg">Your Friends:</p>
      </div>
      <!-- Friends list -->
      <div class="flex flex-col space-y-3">
        <div v-for="friend in friends_list" :key="friend.id" class="flex justify-between">
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
    this.friends()
  },
  methods: {
    async friends() {
      if (this.$store.getters.isLoggedIn) {
        var result = await friendsAPI.getFriends(1)
        this.friends_list = result.friends
        this.user = result.user
      }
    }
  }
}
</script>
