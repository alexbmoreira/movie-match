import api from '@/api/api.service'

async function searchMovie(searchType, search) {
  return api.get(`/movies/${searchType}/${search}/`).then(response => response.data)
}

export default {
  searchMovie
}
