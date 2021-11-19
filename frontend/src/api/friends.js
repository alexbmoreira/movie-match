import {getRequest} from './api.service'
import endpoints from './endpoints'

async function getFriends(userId) {
  return getRequest(endpoints.FRIENDS.with(userId))
}

export default {
  getFriends
}
