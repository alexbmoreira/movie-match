<template>
  <div class="bg-app-bg">
    <div class="flex flex-col p-4">
      <div class="flex flex-col mx-auto mb-6">
        <!-- Profile Pic -->
        <div class="flex mx-auto rounded-full bg-app-bg-sec w-20 h-20">
          <p class="mx-auto my-auto text-4xl">A</p>
        </div>
        <p class="font-roboto-slab text-2xl">alexbmoreira</p>
      </div>
      <div class="flex mb-4">
        <p class="text-lg">Your Friends:</p>
      </div>
      <!-- Friends list -->
      <div class="flex justify-between">
        <!-- Friend -->
        <div class="flex space-x-2">
          <!-- Friend Pic -->
          <div class="flex rounded-full bg-app-bg-sec w-14 h-14">
            <p class="mx-auto my-auto text-xl">W</p>
          </div>
          <div class="my-auto"><p class="font-roboto-slab text-lg">willgale</p></div>
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
</template>

<script>
export default {
  name: 'Home'
}
</script>
