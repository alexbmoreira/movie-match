<template>
  <div class="bg-not-found bg-center bg-cover flex flex-col justify-between pt-12 pb-6 px-2">
    <div>
      <p class="text-4xl font-roboto-slab">
        Whoops!
      </p>
      <p class="text-xl">
        That page doesn't exist.
      </p>
      <TextLink type="router" path="/" text="Phone home..." />
    </div>
    <div>
      <p class="text-right text-xs text-typeface-dark">
        E.T. the Extra-Terrestrial (1982)
      </p>
    </div>
  </div>
</template>

<script>
import TextLink from '@/components/typography/TextLink'

export default {
  name: 'NotFound',
  components: {
    TextLink
  }
}
</script>
