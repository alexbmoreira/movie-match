import { endpoints } from '@shared';
import { getRequest } from './api.service';

async function getProfile(userId) {
  return getRequest(endpoints.PROFILE.with(userId));
}

export default {
  getProfile
};
