<template>
  <div class="flex space-x-3 w-full">
    <form class="flex w-full" @submit.prevent="routeSearch">
      <TextField v-model="search.string" :placeholder="`Search for ${search.type}...`" />
    </form>
    <Button trait="transparent" @onClick="routeSearch">
      <i class="fas fa-search" />
    </Button>
    <div class="flex flex-col">
      <label for="searchType" class="text-xs">Search for:</label>
      <select id="searchType" v-model="search.type" class="bg-app-bg rounded">
        <option value="movies">
          Movies
        </option>
        <option value="actors">
          Actors
        </option>
        <option value="crew">
          Crew
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import TextField from '@/components/inputs/TextField'
import Button from '@/components/buttons/Button'

export default {
  name: 'SearchBar',
  components: {
    TextField,
    Button
  },
  data() {
    return {
      search: {
        string: '',
        type: 'movies'
      }
    }
  },
  methods: {
    routeSearch() {
      if (this.search.string.length > 0) {
        this.$emit('search')
        this.$router
          .push({
            name: 'Search',
            params: {
              searchType: this.search.type,
              search: this.search.string
            }
          })
          .catch(() => {})
      }
    }
  }
}
</script>
