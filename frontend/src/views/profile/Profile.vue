<template>
  <div id="profile_page" class="">
    <div class="flex flex-col py-4">
      <div class="flex flex-col mx-auto mb-6">
        <div class="">
          <ProfilePicture pic-size="20" :user="user" />
        </div>
        <p class="font-roboto-slab text-2xl mx-auto">
          {{ user.username }}
        </p>
      </div>
      <div class="flex mb-2">
        <p class="text-lg">
          Watchlist:
        </p>
      </div>
      <div class="flex mb-2">
        <p class="text-lg">
          {{ `${user.username}'s Friends:` }}
        </p>
      </div>
      <List>
        <ProfileItem v-for="friend in profile.friends" :key="friend.id" :friend="friend" />
      </List>
    </div>
  </div>
</template>

<script>
import ProfilePicture from '@/components/common/ProfilePicture'
import List from '@/components/lists/List'
import ProfileItem from '@/components/lists/ProfileItem'

import profileAPI from '@/api/profiles'

export default {
  name: 'Profile',
  components: {
    ProfilePicture,
    List,
    ProfileItem
  },
  data() {
    return {
      user: {},
      profile: {}
    }
  },
  watch: {
    $route() {
      this.getData()
    }
  },
  created() {
    this.getData()
    console.log(this.profile)
  },
  methods: {
    async getData() {
      this.user = this.$route.params
      this.profile = await profileAPI.getProfile(this.user.id)
    }
  }
}
</script>
