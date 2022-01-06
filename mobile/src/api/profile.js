import { endpoints } from 'shared';
import { getRequest } from './api.service';

async function getUser(userId) {
  return getRequest(endpoints.PROFILE.with(userId));
}

async function searchUsers(params) {
  return getRequest(endpoints.PROFILE.SEARCH, params);
}

export default {
  getUser,
  searchUsers
};
