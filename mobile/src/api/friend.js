import { endpoints } from 'shared';
import { getRequest } from './api.service';

async function getFriendRequest(userId) {
  return getRequest(endpoints.FRIEND_REQUEST.WITH_USER.with(userId));
}

async function getFriendship(userId) {
  return getRequest(endpoints.FRIENDSHIP.WITH_USER.with(userId));
}

export default {
  getFriendRequest,
  getFriendship
};
