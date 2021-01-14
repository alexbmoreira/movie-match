import axios from 'axios'
import Cookies from 'js-cookie'

export default axios.create({
  baseURL: '/api',
  timeout: 5000,
  mode: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRFTOKEN': Cookies.get('csrftoken')
  }
})
