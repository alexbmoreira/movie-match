import { endpoints } from 'shared';
import { getRequest } from './api.service';

async function getUser(userId) {
  return getRequest(endpoints.PROFILE.with(userId));
}

async function searchUsers(searchParams) {
  return getRequest(endpoints.PROFILE.SEARCH, searchParams);
}

export default {
  getUser,
  searchUsers
};
