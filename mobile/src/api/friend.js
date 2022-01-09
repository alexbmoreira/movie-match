import { endpoints } from 'shared';
import { deleteRequest, getRequest, postRequest } from './api.service';

async function getFriendRequest(userId) {
  return getRequest(endpoints.FRIEND_REQUEST.WITH_USER.with(userId));
}

async function sendFriendRequest(data) {
  return postRequest(endpoints.FRIEND_REQUESTS, data);
}

async function acceptFriendRequest(requestId) {
  return postRequest(endpoints.FRIEND_REQUEST.ACCEPT.with(requestId));
}

async function deleteFriendRequest(requestId) {
  return deleteRequest(endpoints.FRIEND_REQUEST.with(requestId));
}

async function getFriendship(userId) {
  return getRequest(endpoints.FRIENDSHIP.WITH_USER.with(userId));
}

export default {
  getFriendRequest,
  sendFriendRequest,
  acceptFriendRequest,
  deleteFriendRequest,
  getFriendship,
};
