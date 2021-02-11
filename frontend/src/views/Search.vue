<template>
  <div class="pt-32 pb-4 mx-4 bg-app-bg min-h-screen border-app-bg-light">
    <div class="border-app-bg-light border-b pb-2 text-xl font-thin">
      <h1>{{ searchData.total_results }} search results for: "{{ search }}"</h1>
      <h2>Category: {{ search_type }}</h2>
    </div>
    <!-- Movies as search category -->
    <div v-if="search_type === 'movies'" class="divide-y border-b divide-app-bg-light border-app-bg-light">
      <div v-for="result in searchData.results" :key="result.id" class="">
        <p class="text-thin text-xl font-roboto-slab">{{ result.title }}</p>
         {{result.release_date}}
      </div>
    </div>
    <!-- Actors as search category -->
    <div v-if="search_type === 'actors'" class="divide-y border-b divide-app-bg-light border-app-bg-light">
      <div v-for="result in searchData.results" :key="result.id" class="">
        <p class="text-thin text-xl font-roboto-slab">{{ result.name }}</p>
        <p>{{result.known_for}}</p>
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
      searchData: {}
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
      }
    }
  }
}
</script>
