import api from '@/api/api.service'
import movieAPI from '@/api/movies'
import Cookies from 'js-cookie'

var config = {}

function setAuth() {
  if (Cookies.get('access_token')) {
    config = {
      headers: {
        Authorization: `Token ${Cookies.get('access_token')}`
      }
    }
  }
}

async function getMatchlist(userID) {
  setAuth()
  var response = await api.get(`/user/matchlist/${userID}`, config).then(response => response.data)

  response.likes.forEach(async function(movie, index, array) {
    array[index] = await movieAPI.getMetadata('movie', movie)
  })
  response.dislikes.forEach(async function(movie, index, array) {
    array[index] = await movieAPI.getMetadata('movie', movie)
  })
  response.matches.forEach(async function(movie, index, array) {
    array[index] = await movieAPI.getMetadata('movie', movie)
  })

  return response
}

export default {
  getMatchlist
}
