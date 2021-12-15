import endpoints from '../shared/endpoints'
import { getRequest, postRequest } from './api.service'

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
  register,
  login,
  logout,
};
