<template>
  <div class="pb-4 mx-4 bg-app-bg min-h-full border-app-bg-light mx-auto">
    <div class="border-app-bg-light border-b pb-2 text-xl font-thin">
      <p class="italic text-sm pl-1 lg:text-base">{{ resultsInfo }}</p>
    </div>
    <div class="divide-y border-b divide-app-bg-light border-app-bg-light">
      <MovieItem v-for="result in searchData.results" :key="result.id" :search-type="searchType" :result="result" />
    </div>
  </div>
</template>

<script>
import MovieItem from '@/components/lists/MovieItem'
import searchAPI from '@/api/movies'

export default {
  name: 'Search',
  components: {
    MovieItem
  },
  data() {
    return {
      search: '',
      searchType: '',
      searchData: {}
    }
  },
  computed: {
    resultsInfo() {
      if (this.searchData.results) {
        var numResults = this.searchData.results.length
        return `Showing ${numResults} result${numResults > 1 ? 's' : ''} in '${this.searchType}' for: '${this.search}'`
      }
      return ''
    }
  },
  watch: {
    $route() {
      this.search = this.$route.params.search
      this.searchType = this.$route.params.searchType
      this.getData()
    }
  },
  created() {
    this.search = this.$route.params.search
    this.searchType = this.$route.params.searchType
    this.getData()
  },
  methods: {
    async getData() {
      this.searchData = await searchAPI.searchMovie(this.$route.params.searchType, this.$route.params.search)
    }
  }
}
</script>
