<template>
  <router-link :to="{ name: 'Profile', params: { username: friend.username, id: friend.id } }">
    <div class="flex justify-between py-2">
      <!-- Friend -->
      <div class="flex space-x-2">
        <!-- Friend Pic -->
        <ProfilePicture pic-size="14" :user="friend" />
        <div class="my-auto">
          <p class="font-roboto-slab text-lg">
            {{ friend.username }}
          </p>
        </div>
      </div>
      <div class="flex my-auto space-x-2">
        <!-- Matches -->
        <CircleButton icon="heart" color="app-like" />
        <!-- Watch -->
        <CircleButton icon="ticket-alt" color="app-accent" />
      </div>
    </div>
  </router-link>
</template>

<script>
import CircleButton from '@/components/actions/CircleButton'
import ProfilePicture from '@/components/common/ProfilePicture'

export default {
  name: 'ProfileItem',
  components: {
    CircleButton,
    ProfilePicture
  },
  props: {
    friend: {
      type: Object,
      default: function() {
        return {}
      }
    }
  }
}
</script>
