import api from '@/api/api.service'

async function getUser() {
  return api.get('/user/').then(response => response.data)
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
