<template>
  <div class="flex w-full justify-between py-2">
    <div class="flex w-full">
      <img class="h-40 md:h-56 object-left border-2 rounded md:my-auto" :src="getPoster(result)" alt="" />
      <div class="flex flex-col mx-2 md:mx-10 md:my-auto">
        <div class="flex flex-wrap">
          <p class="text-xl font-roboto-slab">{{ getTitle(result) }}</p>
        </div>
        <div v-show="searchType === 'movies'" class="flex">
          <div class="flex flex-col">
            <p class="text-thin">{{ result.release_year }}</p>
            <div v-for="director in result.directors" :key="director.id">
              <p class="italic">{{ director.name }}</p>
            </div>
            <div class="hidden lg:flex">
              <p class="text-base font-roboto-slab text-thin">{{ result.overview }}</p>
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
      <div class="flex mx-auto rounded-full bg-app-primary w-8 h-8 cursor-pointer hover:bg-app-accent hover:text-app-typeface-dark">
        <div class="mx-auto my-auto"><i class="fas fa-plus"></i></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListItem',
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
