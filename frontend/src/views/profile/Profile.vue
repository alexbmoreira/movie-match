<template>
  <PageContainer>
    <div class="flex flex-col">
      <div class="flex flex-col mx-auto mb-6">
        <div class="">
          <ProfilePicture pic-size="20" :user="user" />
        </div>
        <p class="font-roboto-slab text-2xl text-center">
          {{ user.username }}
        </p>
      </div>
      <div class="space-y-8">
        <div>
          <SideScrollList label="Watchlist:">
            <Poster
              v-for="movie in profile.watchlist"
              :key="movie.id"
              :poster-path="movie.poster_link_md"
              size="lg"
            />
          </SideScrollList>
        </div>
        <div>
          <List label="Friends:">
            <ProfileItem v-for="friend in profile.friends" :key="friend.id" :user="friend" />
          </List>
        </div>
      </div>
    </div>
  </PageContainer>
</template>

<script>
import _ from 'lodash'
import PageContainer from '@/components/containers/PageContainer'
import ProfilePicture from '@/components/common/ProfilePicture'
import List from '@/components/lists/List'
import SideScrollList from '@/components/lists/SideScrollList'
import ProfileItem from '@/components/lists/ProfileItem'
import Poster from '@/components/movies/Poster'

import profileAPI from '@/api/profiles'
import moviesAPI from '@/api/movies'

export default {
  name: 'Profile',
  components: {
    PageContainer,
    ProfilePicture,
    List,
    SideScrollList,
    ProfileItem,
    Poster
  },
  data() {
    return {
      user: {},
      profile: {}
    }
  },
  watch: {
    $route() {
      this.getData()
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      this.user = this.$route.params
      this.profile = await profileAPI.getProfile(this.user.id)

      this.profile.watchlist = await Promise.all(_.map(this.profile.watchlist, async (m) => {
        return await moviesAPI.getMetadata('movie', m.movie)
      }))
    }
  }
}
</script>
