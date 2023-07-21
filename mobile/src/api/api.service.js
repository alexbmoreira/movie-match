import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { NGROK_HOST } from 'react-native-dotenv';
import _ from 'lodash';

const api = axios.create({
  baseURL: `${NGROK_HOST}/api/v1`,
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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

export default api;
