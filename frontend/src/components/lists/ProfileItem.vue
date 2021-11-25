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
        <Button trait="transparent" font-size="xl" @onClick.stop="()=>{}">
          <i class="fas fa-heart" />
        </Button>
        <!-- Watch -->
        <Button trait="transparent" font-size="xl" @onClick.stop="()=>{}">
          <i class="fas fa-ticket-alt" />
        </Button>
      </div>
    </div>
  </router-link>
</template>

<script>
import Button from '@/components/buttons/Button'
import ProfilePicture from '@/components/common/ProfilePicture'

export default {
  name: 'ProfileItem',
  components: {
    Button,
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
