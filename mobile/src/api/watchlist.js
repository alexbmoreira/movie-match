import { endpoints } from 'shared';
import { deleteRequest, postRequest } from './api.service';

async function addToWatchlist(data) {
  return postRequest(endpoints.EDIT_WATCHLIST, data);
}

async function removeFromWatchlist(data) {
  return deleteRequest(endpoints.EDIT_WATCHLIST, data);
}

export default {
  addToWatchlist,
  removeFromWatchlist
};
