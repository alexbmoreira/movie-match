import { endpoints } from 'shared';
import { getRequest } from './api.service';

async function getJointWatchlist(friendId) {
  return getRequest(endpoints.JOINT_WATCHLIST.with(friendId));
}

export default {
  getJointWatchlist,
};
