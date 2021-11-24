<template>
  <router-link :to="{ name: 'Profile', params: { username: user.username, id: user.id } }">
    <div class="flex justify-between py-2">
      <!-- Friend -->
      <div class="flex space-x-2">
        <!-- Friend Pic -->
        <ProfilePicture pic-size="14" :user="user" />
        <div class="my-auto">
          <p class="font-roboto-slab text-lg">
            {{ user.username }}
          </p>
        </div>
      </div>
      <div class="flex my-auto space-x-2">
        <!-- Matches -->
        <CircleButton icon="heart" color="like" />
        <!-- Watch -->
        <CircleButton icon="ticket-alt" color="primary" />
      </div>
    </div>
  </router-link>
</template>

<script>
import CircleButton from '@/components/buttons/CircleButton'
import ProfilePicture from '@/components/common/ProfilePicture'

export default {
  name: 'ProfileItem',
  components: {
    CircleButton,
    ProfilePicture
  },
  props: {
    user: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
