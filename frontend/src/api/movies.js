import api from '@/api/api.service'

async function searchMovie(search_type, search) {
  return api.get(`/movies/${search_type}/${search}/`).then(response => response.data)
}

export default {
  searchMovie
}
