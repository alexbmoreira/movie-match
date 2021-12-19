import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { NGROK_HOST } from 'react-native-dotenv';

const api = axios.create({
  baseURL: `${NGROK_HOST}/api`,
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

const request = async (url, payload, func) => {
  try {
    const response = await func(url, payload);
    return { data: response.data };
  } catch (e) {
    if (e.response.data) {
      return { errors: e.response.data };
    }

    throw e;
  }
};

export const postRequest = async (url, payload = {}) => {
  return await request(url, payload, api.post);
};

export const getRequest = async (url, payload = {}) => {
  return await request(url, payload, api.get);
};
