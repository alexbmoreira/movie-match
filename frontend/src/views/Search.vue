<template>
  <div class="pt-32 bg-app-bg min-h-screen border-app-bg-light">
    <div class="border-app-bg-light border-b mx-2 text-xl font-thin">
      <h1>{{ searchData.total_results }} search results for: "{{ search }}"</h1>
      <h2>category: {{ search_type }}</h2>
    </div>
    <div class="divide-y mx-2 border-b divide-app-bg-light border-app-bg-light">
      <div v-for="result in searchData.results" :key="result.id"><p class="text-xl">{{ result.title }}</p> {{result.release_date}}</div>
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
