import { endpoints } from 'shared';
import { deleteRequest, postRequest } from './api.service';

async function addToWatchlist(data) {
  return postRequest(endpoints.WATCHLIST.POST, data);
}

async function removeFromWatchlist(movieId) {
  return deleteRequest(endpoints.WATCHLIST.DELETE.with(movieId));
}

export default {
  addToWatchlist,
  removeFromWatchlist
};
