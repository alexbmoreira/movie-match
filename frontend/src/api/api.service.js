import axios from 'axios'
import Cookies from 'js-cookie'

export default axios.create({
  baseURL: process.env.VUE_APP_URL + '/api',
  timeout: 5000,
  mode: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRFTOKEN': Cookies.get('csrftoken')
  }
})
