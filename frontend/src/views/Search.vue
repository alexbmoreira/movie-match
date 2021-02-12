<template>
  <div class="pb-4 mx-4 bg-app-bg min-h-full border-app-bg-light md:mx-auto md:px-10">
    <div class="border-app-bg-light border-b pb-2 text-xl font-thin">
      <p class="italic pl-1">{{ searchData.total_results }} search results for: '{{ search }}'</p>
      <p class="italic pl-1">Category: {{ search_type }}</p>
    </div>
    <!-- Movies as search category -->
    <div v-if="search_type === 'movies'" class="divide-y border-b divide-app-bg-light border-app-bg-light">
      <div v-for="result in searchData.results" :key="result.id" class="py-2 flex w-full">
        <img class="h-40 md:h-56 object-left border-2 rounded md:my-auto" :src="getPoster(result)" alt="" />
        <div class="flex flex-col mx-2 md:mx-10 md:my-auto">
          <div class="flex flex-wrap">
            <p class="text-thin text-xl font-roboto-slab">{{ getTitle(result) }}</p>
          </div>
          <div>
            <p class="text-thin">{{ result.release_year }}</p>
          </div>
          <div v-for="director in result.directors" :key="director.id">
            <p class="italic">{{ director.name }}</p>
          </div>
          <div class="hidden lg:flex">
            <p class="text-base font-roboto-slab text-thin">{{ result.overview }}</p>
          </div>
        </div>
        <div class="my-auto px-2">
          <button class="hover:text-app-primary hover:cursor-pointer">
            <p class="hidden md:flex">Add to watchlist!</p>
            <i class="fas fa-plus-circle"></i>
          </button>
        </div>
      </div>
    </div>
    <!--     End of movies                                   -->

    <!-- Actors as search category -->
    <div v-if="search_type === 'actors'" class="divide-y border-b divide-app-bg-light border-app-bg-light">
      <div v-for="result in searchData.results" :key="result.id" class="py-2 flex">
        <img class="h-40 md:h-56 object-left border-2 rounded md:my-auto" :src="getPoster(result)" alt="" />
        <div class="flex flex-col mx-2 md:mx-10 md:my-auto">
          <div class="flex flex-wrap">
            <p class="text-thin text-xl font-roboto-slab">{{ getTitle(result) }}</p>
          </div>
          <!--p class="text-thin my-1">{{ result.known_for[0].title }}</p-->
          <p class="mb-6 italic text-bg-app-accent">{{ result.known_for_department }}</p>
          <p class="text-thin text-sm">Known for:</p>
          <p v-for="kf in result.known_for" :key="kf.id" class="text-sm font-roboto-slab">- {{ kf.title }}{{ kf.original_name }}</p>
        </div>
      </div>
    </div>
    <!--     End of actors                                   -->
    <!-- Crew as search category -->
    <div v-if="search_type === 'crew'" class="divide-y border-b divide-app-bg-light border-app-bg-light">
      <div v-for="result in searchData.results" :key="result.id" class="py-2 flex">
        <img v-if="result.profile_link_sm !== 'https://image.tmdb.org/t/p/w154None'" class="object-scale-down h-40 md:h-56 object-left border-2 rounded" :src="result.profile_link_sm" alt="" />
        <img v-if="result.profile_link_sm === 'https://image.tmdb.org/t/p/w154None'" class="object-scale-down h-40 md:h-56 object-left border-2 rounded" :src="missing_poster" alt="" />
        <div class="flex flex-col mx-2 md:mx-10 md:my-auto">
          <p class="text-thin text-xl font-roboto-slab">{{ result.name }}</p>
          <p class="mb-6 italic text-bg-app-accent">{{ result.known_for_department }}</p>
          <p class="text-thin text-sm">Known for:</p>
          <!--p class="text-sm italic">{{ result.known_for[0].title }}</p-->
          <p v-for="kf in result.known_for" :key="kf.id" class="text-sm font-roboto-slab">- {{ kf.title }}{{ kf.original_name }}</p>
        </div>
      </div>
    </div>
    <!--     Crew of actors                                   -->
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
