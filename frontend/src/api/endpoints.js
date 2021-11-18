const endpoints = {
  AUTH: {
    LOGIN: '/rest-auth/login/',
    REGISTER: '/rest-auth/register/',
    LOGOUT: '/rest-auth/logout/'
  },
  USER: '/user/',
  FRIENDS: {
    with(userId) {
      return `/profiles/${userId}/friends/`
    }
  },
  PROFILE: {
    with(userId) {
      return `/profiles/${userId}/`
    }
  },
  TMDB: {
    SEARCH: {
      with(searchType) {
        return `/movies/${searchType}/`
      }
    },
    DATA: { 
      with(type, id) {
        return `/movies/${type}/${id}`
      }
    }
  }
}

export default endpoints
