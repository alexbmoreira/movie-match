import axios from 'axios'
import Cookies from 'js-cookie'

const instance = axios.create({
  baseURL: process.env.VUE_APP_URL + 'api',
  mode: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRFTOKEN': Cookies.get('csrftoken')
  }
})

instance.interceptors.request.use(
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

export default instance
