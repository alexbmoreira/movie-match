import { endpoints } from 'shared';
import { postRequest } from './api.service';

async function login(data) {
  return postRequest(endpoints.AUTH.LOGIN, data);
}

async function register(data) {
  return postRequest(endpoints.AUTH.REGISTER, data);
}

async function logout() {
  return postRequest(endpoints.AUTH.LOGOUT);
}

export default {
  register,
  login,
  logout,
};
