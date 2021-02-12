<template>
  <div class="pt-32 pb-4 mx-4 bg-app-bg min-h-screen border-app-bg-light">
    <div class="border-app-bg-light border-b pb-2 text-xl font-thin">
      <h1>{{ searchData.total_results }} search results for: "{{ search }}"</h1>
      <h2>Category: {{ search_type }}</h2>
    </div>
    <!-- Movies as search category -->
    <div v-if="search_type === 'movies'" class="divide-y border-b divide-app-bg-light border-app-bg-light">
      <div v-for="result in searchData.results" :key="result.id" class="py-2 flex">
        <img v-if="result.poster_link_sm !== 'https://image.tmdb.org/t/p/w154None'" class="object-scale-down h-40 object-left border-2 rounded" :src="result.poster_link_sm" alt="">
        <img v-if="result.poster_link_sm === 'https://image.tmdb.org/t/p/w154None'" class="object-scale-down h-40 object-left border-2 rounded" :src="missing_poster" alt="">
        <div class="flex flex-col mx-2">
          <div class="flex flex-wrap">
            <p class="text-thin text-xl font-roboto-slab">{{ result.title }}</p>
          </div>
          <div>
            <p class="text-thin">{{ result.release_year }}</p>
          </div>
          <div v-for="director in result.directors" :key="director.id">
            <p class="italic">{{ director.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <!--     End of movies                                   -->

    <!-- Actors as search category -->
    <div v-if="search_type === 'actors'" class="divide-y border-b divide-app-bg-light border-app-bg-light">
      <div v-for="result in searchData.results" :key="result.id" class="py-2 flex">
        <img v-if="result.profile_link_sm !== 'https://image.tmdb.org/t/p/w154None'" class="object-scale-down h-40 object-left border-2 rounded" :src="result.profile_link_sm" alt="">
        <img v-if="result.profile_link_sm === 'https://image.tmdb.org/t/p/w154None'" class="object-scale-down h-40 object-left border-2 rounded" :src="missing_poster" alt="">
        <div class="flex flex-col mx-2">
          <p class="text-thin text-xl font-roboto-slab">{{ result.name }}</p>
          <!--p class="text-thin my-1">{{ result.known_for[0].title }}</p-->
          <p class="text-thin my-2">Known for:</p>
          <p v-for="kf in result.known_for" :key="kf.id" class="text-sm italic">- {{ kf.title }}{{ kf.original_name }}</p>
        </div>
      </div>
    </div>
  <!--     End of actors                                   -->
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
    async makeSearch() {
      if (this.search && this.search.length > 0 && this.search_type.length > 0) {
        this.searchData = await searchAPI.searchMovie(this.search_type, this.search)
        console.log(this.searchData)

        //var delete_this_shit = await searchAPI.searchMovie(this.search_type, this.search)
        //console.log(delete_this_shit)

      }
    }
  }
}
</script>
