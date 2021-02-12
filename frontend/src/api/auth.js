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

async function getUser() {
  setAuth()
  return api.get('/user/', config).then(response => response.data)
}

async function login(data) {
  return api.post('/rest-auth/login/', data).then(response => response.data)
}

async function register(data) {
  return api.post('/rest-auth/register/', data).then(response => response.data)
}

async function logout() {
  return api.post('/rest-auth/logout/')
}

export default {
  getUser,
  login,
  register,
  logout
}
