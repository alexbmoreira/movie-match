import api from '@/api/api.service'
import Cookies from 'js-cookie'

var config = {}

function setAuth() {
  if (Cookies.get('access_token')) {
    config = {
      headers: {
        Authorization: `Token ${Cookies.get('access_token')}`
      }
    }
  }
}

async function getFriends(user_id) {
  setAuth()
  return api.get(`/profiles/${user_id}/friends/`, config).then(response => response.data)
}

export default {
  getFriends
}
