<template>
  <div id="profile_page" class="">
    <div class="flex flex-col py-4">
      <div class="mx-auto mb-2">
        <p class="text-xl text-app-typeface-muted invisible">Welcome back,</p>
      </div>
      <div class="flex flex-col mx-auto mb-6">
        <div class="">
          <ProfilePicture pic-size="20" :user="user" />
        </div>
        <p class="font-roboto-slab text-2xl mx-auto">{{ $route.params.username }}</p>
      </div>
      <div class="flex mb-2">
        <p class="text-lg">Watchlist:</p>
      </div>
      <div class="flex mb-2">
        <p class="text-lg">Username's Friends:</p>
      </div>
      <div class="flex flex-col divide-y divide-app-bg-light">
        <FriendItem v-for="friend in friendsList" :key="friend.id" :friend="friend" />
      </div>
    </div>
    <div>
      {{ $route.params.username }}
      {{ $route.params.id }}
    </div>
  </div>
</template>

<script>
import ProfilePicture from '@/components/common/ProfilePicture'

export default {
  name: 'Profile',
  components: {
    ProfilePicture
  },
  data() {
    return {
      user: {},
      profile: {}
    }
  },
  watch: {
    $route(to, from) {
      // This function watches for route changes. In other words, when you go from profile/alex to profile/will, the route is the same (same issue as search)
      // This makes it so that it can stay on the page but update based on the new params (i.e. new users)

      console.log(to) // This is the user profile you came from
      console.log(from) // This is the user profile you're going to

      // You probably don't need to actually use either if your API functions can work using $route.params.id
      // Call this.getData() here to get all the necessary data on creation
      this.getData()
    }
  },
  created() {
    this.getData()
    // In here is where you get all data from users (Profile info, friends, etc.)
    // Check the backend code for any urls you need
    // Call this.getData() here to get all the necessary data on creation
  },
  methods: {
    getData() {
      this.user = this.$store.getters.user
      // Call all your API calling functions here
      // this.getProfile()
      // this.getFriends()
      // etc.
    },
    async getProfile() {
      // Call the profileAPI by passing $route.params.id
      // You'll have to write a new set of API functions, so make a profiles.js file in the api folder
      // Use the response to populate the profile object in this case
    }
  }
}
</script>
