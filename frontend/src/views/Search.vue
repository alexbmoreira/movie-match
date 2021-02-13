<template>
  <div class="pb-4 mx-4 bg-app-bg min-h-full border-app-bg-light md:mx-auto md:px-10">
    <div class="border-app-bg-light border-b pb-2 text-xl font-thin">
      <p class="italic pl-1">{{ searchData.total_results }} search results for: '{{ search }}'</p>
      <p class="italic pl-1">Category: {{ search_type }}</p>
    </div>
    <div class="divide-y border-b divide-app-bg-light border-app-bg-light">
      <div v-for="result in searchData.results" :key="result.id" class="flex py-2 w-full justify-between">
        <div class="flex w-full">
          <img class="h-40 md:h-56 object-left border-2 rounded md:my-auto" :src="getPoster(result)" alt="" />
          <div class="flex flex-col mx-2 md:mx-10 md:my-auto">
            <div class="flex flex-wrap">
              <p class="text-xl font-roboto-slab">{{ getTitle(result) }}</p>
            </div>
            <div v-show="search_type === 'movies'" class="flex">
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
            <div v-show="search_type !== 'movies'" class="flex">
              <div class="flex flex-col">
                <p class="italic">{{ result.known_for_department }}</p>
                <p class="text-sm">Known for:</p>
                <p v-for="kf in result.known_for" :key="kf.id" class="text-xs">- {{ kf.title }}{{ kf.original_name }}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-show="search_type === 'movies'" class="flex flex-col my-auto">
          <p class="hidden text-xs text-center md:flex">Add to watchlist!</p>
          <div class="flex mx-auto rounded-full bg-app-primary w-8 h-8 cursor-pointer hover:bg-app-accent hover:text-app-typeface-dark">
            <div class="mx-auto my-auto"><i class="fas fa-plus"></i></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import searchAPI from '../api/movies'

export default {
  name: 'Search',
  data() {
    return {
      search: '',
      search_type: '',
      searchData: {},
      missing_poster: 'https://image.tmdb.org/t/p/w154/sqZKCRYGovZ8aN99VVJSdL8Ja9k.jpg'
    }
  },
  created() {
    this.search = this.$route.params.search
    this.search_type = this.$route.params.search_type

    this.makeSearch()
  },
  methods: {
    getPoster(result) {
      if (this.search_type == 'movies') {
        return result.poster_path ? result.poster_link_md : require('@/assets/images/missing_poster.png')
      } else {
        return result.profile_path ? result.profile_link_md : require('@/assets/images/missing_poster.png')
      }
    },
    getTitle(result) {
      if (this.search_type == 'movies') {
        return result.title
      } else {
        return result.name
      }
    },
    async makeSearch() {
      if (this.search && this.search.length > 0 && this.search_type.length > 0) {
        this.searchData = await searchAPI.searchMovie(this.search_type, this.search)
        console.log(this.searchData)
      }
    }
  }
}
</script>
