import api from '@/api/api.service'

async function makeSearch(searchType, search, page = 1) {
  return api.get(`/movies/${searchType}/`, { params: { search, page } }).then(response => response.data)
}

async function getMetadata(type, id) {
  return api.get(`/movies/${type}/${id}`).then(response => response.data)
}

export default {
  makeSearch,
  getMetadata
}
