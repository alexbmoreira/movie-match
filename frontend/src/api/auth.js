import {getRequest, postRequest} from './api.service'
import endpoints from './endpoints'

async function getUser() {
  return getRequest(endpoints.USER)
}

async function login(data) {
  return postRequest(endpoints.AUTH.LOGIN, data)
}

async function register(data) {
  return postRequest(endpoints.AUTH.REGISTER, data)
}

async function logout() {
  return postRequest(endpoints.AUTH.LOGOUT)
}

export default {
  getUser,
  login,
  register,
  logout
}
