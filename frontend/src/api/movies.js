import api from '@/api/api.service'

async function searchMovie(searchType, search, page = 1) {
  return api.get(`/movies/${searchType}/${search}/${page}`).then(response => response.data)
}

export default {
  searchMovie
}
