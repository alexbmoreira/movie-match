import api from '@/api/api.service'

async function getProfile(userId) {
  return api.get(`/profiles/${userId}/`).then(response => response.data)
}

export default {
  getProfile
}
