import { endpoints } from 'shared';
import { getRequest } from './api.service';

async function makeSearch(searchType, searchParams) {
  return getRequest(endpoints.TMDB.SEARCH.with(searchType), searchParams);
}

async function getMetadata(type, id) {
  return getRequest(endpoints.TMDB.DATA.with(type, id));
}

async function getMetadataForUser(movieId) {
  return getRequest(endpoints.MOVIE_DETAILS_FOR_USER.with(movieId));
}

export default {
  makeSearch,
  getMetadata,
  getMetadataForUser
};
