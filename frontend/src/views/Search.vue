<template>
  <div class="pb-4 mx-4 bg-app-bg min-h-full border-app-bg-light mx-auto">
    <div class="border-app-bg-light border-b pb-2 text-xl font-thin">
      <p class="italic text-sm pl-1 lg:text-base">{{ resultsInfo }}</p>
    </div>
    <div class="divide-y border-b divide-app-bg-light border-app-bg-light">
      <MovieItem v-for="result in results" :key="result.id" :search-type="searchType" :result="result" />
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
      results: [],
      currentPage: 1,
      totalPages: 1
    }
  },
  computed: {
    resultsInfo() {
      if (this.results) {
        var numResults = this.results.length
        return `Showing ${numResults} result${numResults !== 1 ? 's' : ''} in '${this.searchType}' for: '${this.search}'`
      }
      return ''
    }
  },
  watch: {
    $route() {
      this.search = this.$route.params.search
      this.searchType = this.$route.params.searchType
      this.results = []
      this.currentPage = 1
      this.getData()
    }
  },
  mounted() {
    this.search = this.$route.params.search
    this.searchType = this.$route.params.searchType
    this.getData()
  },
  created() {
    document.addEventListener('scroll', this.onScroll)
  },
  destroyed() {
    document.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll() {
      if (window.pageYOffset + window.innerHeight === document.body.offsetHeight) {
        this.getData(this.currentPage + 1)
      }
    },
    async getData(page = this.currentPage) {
      if (page <= this.totalPages) {
        this.currentPage = page
        var res = await searchAPI.searchMovie(this.$route.params.searchType, this.$route.params.search, page)

        this.results = this.results.concat(res.results)
        this.totalPages = res.total_pages
      }
    }
  }
}
</script>
