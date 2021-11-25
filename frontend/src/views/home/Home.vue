<template>
  <PageContainer>
    <div v-if="isLoggedIn" class="flex flex-col">
      <div class="mx-auto mb-2">
        <p class="text-xl text-typeface-dark">
          Welcome back,
        </p>
      </div>
      <div class="flex flex-col mx-auto mb-6">
        <!-- Profile Pic -->
        <router-link :to="{ name: 'Profile', params: { username: user.username, id: user.id } }">
          <ProfilePicture pic-size="20" :user="user" />
          <p class="font-roboto-slab text-2xl text-center">
            {{ user.username }}
          </p>
        </router-link>
      </div>
      <List label="Your Friends:">
        <ProfileItem v-for="friend in friendsList" :key="friend.id" :user="friend.friend" />
      </List>
    </div>
    <div v-else class="flex flex-col mx-auto my-auto mt-8">
      <div class="text-center mb-10">
        <p class="font-roboto-slab text-4xl mb-4">
          Have a no-fight movie night!
        </p>
        <p class="text-lg">
          Decide what to watch with friends based on your personal watchlists.
        </p>
      </div>
      <div class="flex flex-col mx-auto">
        <router-link to="/register" class="mx-auto mb-2">
          <Button>Create an Account</Button>
        </router-link>
        <div class="text-center">
          <p class="text-xs">
            OR
          </p>
          <TextLink type="router" path="/login" text="Log in" />
        </div>
      </div>
    </div>
  </PageContainer>
</template>

<script>
import PageContainer from '@/components/containers/PageContainer'
import ProfilePicture from '@/components/common/ProfilePicture'
import List from '@/components/lists/List'
import ProfileItem from '@/components/lists/ProfileItem'
import Button from '@/components/buttons/Button'
import TextLink from '@/components/typography/TextLink'
import friendsAPI from '@/api/friends'

export default {
  name: 'Home',
  components: {
    PageContainer,
    ProfilePicture,
    List,
    ProfileItem,
    Button,
    TextLink
  },
  data() {
    return {
      friendsList: [],
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
        const result = await friendsAPI.getFriends(this.user.id)
        this.friendsList = result
      }
    }
  }
}
</script>
