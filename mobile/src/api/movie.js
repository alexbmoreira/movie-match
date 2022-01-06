import { endpoints } from 'shared';
import { getRequest } from './api.service';

async function makeSearch(type, params) {
  return getRequest(endpoints.TMDB.SEARCH.with(type), params);
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
