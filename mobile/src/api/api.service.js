import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { NGROK_HOST } from 'react-native-dotenv';
import _ from 'lodash';

const api = axios.create({
  baseURL: `${NGROK_HOST}/api/v1`,
});

api.interceptors.request.use(
  async (config) => {
    const cookie = await AsyncStorage.getItem('set-cookie');
    if (cookie) {
      config.headers.Cookie = `${cookie}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

api.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (!error.response) {
    return Promise.reject(error);
  }

  const status = _.get(error, 'response.status');
  switch (status) {
  case 422:
    error.formErrors = _.get(error.response, 'data.errors');
    break;
  default:
    break;
  }
  return Promise.reject(error);
});

export const postRequest = async (url, payload = {}) => {
  return payload;
};

export const getRequest = async (url, params = {}) => {
  return params;
};

export const deleteRequest = async (url) => {
  return url;
};

export default api;
