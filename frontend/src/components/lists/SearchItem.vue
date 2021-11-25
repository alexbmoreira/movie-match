<template>
  <div class="flex justify-between py-2">
    <div class="flex w-full">
      <Poster :poster-path="getPoster(result)" size="lg" />
      <div class="flex flex-col mx-2 lg:ml-10 my-auto">
        <div class="flex flex-wrap">
          <p class="text-xl font-roboto-slab lg:text-3xl">
            {{ getTitle(result) }}
          </p>
        </div>
        <div v-show="searchType === 'movies'" class="flex">
          <div class="flex flex-col">
            <p class="text-sm text-typeface-dark">
              {{ result.release_year }}
            </p>
            <div v-for="director in result.directors" :key="director.id">
              <p class="italic">
                {{ director.name }}
              </p>
            </div>
            <div class="hidden lg:max-h-36 lg:overflow-hidden lg:flex">
              <p class=" text-sm">
                {{ result.overview }}
              </p>
            </div>
          </div>
        </div>
        <div v-show="searchType !== 'movies'" class="flex">
          <div class="flex flex-col">
            <p class="italic">
              {{ result.known_for_department }}
            </p>
            <p v-if="!!result.known_for && result.known_for.length > 0" class="text-sm text-typeface-dark">
              Known for:
            </p>
            <p v-for="kf in result.known_for" :key="kf.id" class="text-xs text-typeface-dark">
              - {{ kf.title }}{{ kf.name }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-show="showAddToWatchlist" class="flex flex-col my-auto">
      <Button trait="transparent" font-size="xl" @onClick.stop="()=>{}">
        <i class="fas fa-plus" />
      </Button>
    </div>
  </div>
</template>

<script>
import Button from '@/components/buttons/Button'
import Poster from '@/components/movies/Poster'

export default {
  name: 'SearchItem',
  components: {
    Button,
    Poster
  },
  props: {
    searchType: {
      type: String,
      default: ''
    },
    result: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    showAddToWatchlist() {
      return this.searchType === 'movies' && this.$store.getters.isLoggedIn
    }
  },
  methods: {
    getPoster(result) {
      return this.searchType == 'movies' ? result.poster_link_md : result.profile_link_md
    },
    getTitle(result) {
      return this.searchType == 'movies' ? result.title : result.name
    }
  }
}
</script>
