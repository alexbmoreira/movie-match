const endpoints = {
  AUTH: {
    LOGIN: '/login/',
    REGISTER: '/register/',
    LOGOUT: '/logout/'
  },
  USER: {
    with(userId) {
      return `/users/${userId}/`;
    },
    FRIENDS: {
      with(userId) {
        return `/users/${userId}/friends/`;
      }
    },
    WATCHLIST: {
      with(userId) {
        return `/users/${userId}/watchlist/`;
      }
    }
  },
  FRIEND_REQUESTS: {
    ALL: '/friend_requests/'
  },
  TMDB: {
    MOVIES: {
      with(movieId) {
        return `/movies/${movieId}/`;
      }
    }
  },
  WATCHLIST: {
    with(movieId) {
      return `/watchlist_movies/${movieId}/`;
    }
  },
  SEARCH: '/search/'
};

export default endpoints;
