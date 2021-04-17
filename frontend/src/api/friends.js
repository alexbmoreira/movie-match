import api from '@/api/api.service'

async function getFriends(userID) {
  return api.get(`/profiles/${userID}/friends/`).then(response => response.data)
}

export default {
  getFriends
}
