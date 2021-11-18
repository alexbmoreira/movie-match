import {getRequest} from './api.service'
import endpoints from './endpoints'

async function getProfile(userId) {
  return getRequest(endpoints.PROFILE.with(userId))
}

export default {
  getProfile
}
