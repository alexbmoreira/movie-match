import api from '@/api/api.service'
import movieAPI from '@/api/movies'

async function getMatchlist(userID) {
  var response = await api.get(`/user/matchlist/${userID}`).then(response => response.data)

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

async function getJointWatchlist(userID) {
  var response = await api.get(`/user/joint-watchlist/${userID}`).then(response => response.data)

  response.joint_watchlist.forEach(async function(movie, index, array) {
    array[index] = await movieAPI.getMetadata('movie', movie)
  })

  return response
}

async function getWatchlist(userID) {
  var response = await api.get(`/profiles/${userID}/watchlist`).then(response => response.data)

  response.watchlist.forEach(async function(movie, index, array) {
    array[index] = await movieAPI.getMetadata('movie', movie)
  })

  return response
}

export default {
  getMatchlist,
  getJointWatchlist,
  getWatchlist
}
