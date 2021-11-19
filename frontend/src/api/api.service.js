import axios from 'axios'
import Cookies from 'js-cookie'

const api = axios.create({
  baseURL: process.env.VUE_APP_URL + 'api',
  mode: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRFTOKEN': Cookies.get('csrftoken')
  }
})

api.interceptors.request.use(
  async config => {
    const token = Cookies.get('access_token')
    if (token) {
      config.headers.Authorization = `Token ${token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

const request = async (url, payload, func) => {
  try {
    const response = await func(url, payload)
    return response.data
  } catch (e) {
    if (e.response.data) {
      return {errors: e.response.data}
    }

    throw e
  }
}

export const postRequest = async (url, payload = {}) => {
  return await request(url, payload, api.post)
}

export const getRequest = async (url, payload = {}) => {
  return await request(url, payload, api.get)
}
