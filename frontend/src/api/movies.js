import {getRequest} from './api.service'
import endpoints from './endpoints'

async function makeSearch(searchType, searchParams) {
  return getRequest(endpoints.TMDB.SEARCH.with(searchType), searchParams)
}

async function getMetadata(type, id) {
  return getRequest(endpoints.TMDB.DATA.with(type, id))
}

export default {
  makeSearch,
  getMetadata
}
