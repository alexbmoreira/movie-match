<template>
  <PageContainer>
    <div class="border-app-bg-light border-b pb-2 text-xl font-thin">
      <p class="italic text-sm pl-1 lg:text-base">
        {{ resultsInfo }}
      </p>
    </div>
    <List>
      <SearchItem
        v-for="result in results"
        :key="result.id"
        :search-type="searchType"
        :result="result"
      />
    </List>
  </PageContainer>
</template>

<script>
import PageContainer from '@/components/containers/PageContainer'
import List from '@/components/lists/List'
import SearchItem from '@/components/lists/SearchItem'

import searchAPI from '@/api/movies'

export default {
  name: 'Search',
  components: {
    PageContainer,
    List,
    SearchItem
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
        const numResults = this.results.length
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
        const searchParams = {params: {search: this.$route.params.search, page}}
        const res = await searchAPI.makeSearch(this.$route.params.searchType, searchParams)

        this.results = this.results.concat(res.results)
        this.totalPages = res.total_pages
      }
    }
  }
}
</script>
