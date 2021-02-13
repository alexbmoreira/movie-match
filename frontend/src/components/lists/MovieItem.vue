<template>
  <div class="flex w-full justify-between py-2">
    <div class="flex w-full">
      <img class="h-poster-sm w-poster-sm object-left object-cover border-2 rounded lg:my-auto lg:h-poster-md lg:w-poster-md" :src="getPoster(result)" alt="" />
      <div class="flex flex-col mx-2 lg:ml-10 my-auto">
        <div class="flex flex-wrap">
          <p class="text-xl font-roboto-slab">{{ getTitle(result) }}</p>
        </div>
        <div v-show="searchType === 'movies'" class="flex">
          <div class="flex flex-col">
            <p class="text-sm text-app-typeface-muted">{{ result.release_year }}</p>
            <div v-for="director in result.directors" :key="director.id">
              <p class="italic">{{ director.name }}</p>
            </div>
            <div class="hidden lg:max-h-36 lg:overflow-hidden lg:flex">
              <p class=" text-sm">{{ result.overview }}</p>
            </div>
          </div>
        </div>
        <div v-show="searchType !== 'movies'" class="flex">
          <div class="flex flex-col">
            <p class="italic">{{ result.known_for_department }}</p>
            <p class="text-sm">Known for:</p>
            <p v-for="kf in result.known_for" :key="kf.id" class="text-xs">- {{ kf.title }}{{ kf.original_name }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-show="searchType === 'movies'" class="flex flex-col my-auto">
      <p class="hidden text-xs text-center md:flex">Add to watchlist!</p>
      <CircleButton icon="plus" color="app-primary" />
    </div>
  </div>
</template>

<script>
import CircleButton from '@/components/CircleButton'

export default {
  name: 'MovieItem',
  components: {
    CircleButton
  },
  props: {
    searchType: {
      type: String,
      default: ''
    },
    result: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  methods: {
    getPoster(result) {
      if (this.searchType == 'movies') {
        return result.poster_path ? result.poster_link_md : require('@/assets/images/missing_poster.png')
      } else {
        return result.profile_path ? result.profile_link_md : require('@/assets/images/missing_poster.png')
      }
    },
    getTitle(result) {
      if (this.searchType == 'movies') {
        return result.title
      } else {
        return result.name
      }
    }
  }
}
</script>
