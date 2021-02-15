<template>
  <div class="pb-4 mx-4 bg-app-bg min-h-full border-app-bg-light mx-auto">
    <div class="border-app-bg-light border-b pb-2 text-xl font-thin">
      <p class="italic pl-1">{{ searchData.total_results }} search results for: '{{ search }}'</p>
      <p class="italic pl-1">Category: {{ searchType }}</p>
    </div>
    <div class="divide-y border-b divide-app-bg-light border-app-bg-light">
      <MovieItem v-for="result in searchData.results" :key="result.id" :search-type="searchType" :result="result" />
    </div>
  </div>
</template>

<script>
import MovieItem from '@/components/lists/MovieItem'

export default {
  name: 'Search',
  components: {
    MovieItem
  },
  data() {
    return {}
  },
  computed: {
    search() {
      return this.$store.getters.search
    },
    searchType() {
      return this.$store.getters.searchType
    },
    searchData() {
      return this.$store.getters.searchData
    }
  },
  methods: {}
}
</script>
