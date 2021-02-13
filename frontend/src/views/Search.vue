<template>
  <div class="pb-4 mx-4 bg-app-bg min-h-full border-app-bg-light md:mx-auto md:px-10">
    <div class="border-app-bg-light border-b pb-2 text-xl font-thin">
      <p class="italic pl-1">{{ searchData.total_results }} search results for: '{{ search }}'</p>
      <p class="italic pl-1">Category: {{ search_type }}</p>
    </div>
    <div class="divide-y border-b divide-app-bg-light border-app-bg-light">
      <ListItem v-for="result in searchData.results" :key="result.id" :search-type="search_type" :result="result" />
    </div>
  </div>
</template>

<script>
import searchAPI from '../api/movies'
import ListItem from '@/components/lists/ListItem'

export default {
  name: 'Search',
  components: {
    ListItem
  },
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
