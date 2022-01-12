import { endpoints } from 'shared';
import { deleteRequest, getRequest, postRequest } from './api.service';

async function getFriendRequest(userId) {
  return getRequest(endpoints.FRIEND_REQUEST.WITH_USER.with(userId));
}

async function sendFriendRequest(data) {
  return postRequest(endpoints.FRIEND_REQUESTS, data);
}

async function acceptFriendRequest(friendRequestId) {
  return postRequest(endpoints.FRIEND_REQUEST.ACCEPT.with(friendRequestId));
}

async function deleteFriendRequest(friendRequestId) {
  return deleteRequest(endpoints.FRIEND_REQUEST.with(friendRequestId));
}

async function deleteFriendship(friendshipId) {
  return deleteRequest(endpoints.FRIENDSHIP.with(friendshipId));
}

async function getFriendship(userId) {
  return getRequest(endpoints.FRIENDSHIP.WITH_USER.with(userId));
}

async function getFriends(userId) {
  return getRequest(endpoints.FRIENDS.with(userId));
}

export default {
  getFriendRequest,
  sendFriendRequest,
  acceptFriendRequest,
  deleteFriendRequest,
  deleteFriendship,
  getFriendship,
  getFriends
};
