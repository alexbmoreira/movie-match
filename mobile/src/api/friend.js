import { endpoints } from 'shared';
import { deleteRequest, getRequest, postRequest } from './api.service';

async function getFriendRequest(userId) {
  return getRequest(endpoints.FRIEND_REQUEST.WITH_USER.with(userId));
}

async function sendFriendRequest() {
  return getRequest(endpoints.FRIEND_REQUESTS);
}

async function acceptFriendRequest(requestId, data) {
  return postRequest(endpoints.FRIEND_REQUESTS.ACCEPT.with(requestId), data);
}

async function declineFriendRequest(requestId) {
  return deleteRequest(endpoints.FRIEND_REQUEST.with(requestId));
}

async function getFriendship(userId) {
  return getRequest(endpoints.FRIENDSHIP.WITH_USER.with(userId));
}

export default {
  getFriendRequest,
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  getFriendship,
};
