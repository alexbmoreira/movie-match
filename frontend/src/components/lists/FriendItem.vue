<template>
  <div class="flex justify-between py-2">
    <!-- Friend -->
    <div class="flex space-x-2">
      <!-- Friend Pic -->
      <div class="flex rounded-full bg-app-bg-sec w-14 h-14">
        <p class="mx-auto my-auto text-xl uppercase">{{ friend.username.substring(0, 1) }}</p>
      </div>
      <div class="my-auto">
        <p class="font-roboto-slab text-lg">{{ friend.username }}</p>
      </div>
    </div>
    <div class="flex my-auto space-x-2">
      <!-- Matches -->
      <CircleButton icon="heart" color="app-like" />
      <!-- Watch -->
      <CircleButton icon="ticket-alt" color="app-accent" />
    </div>
  </div>
</template>

<script>
import CircleButton from '@/components/CircleButton'

export default {
  name: 'FriendItem',
  components: {
    CircleButton
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
