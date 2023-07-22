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
    ALL: '/friend_requests/',
    ACCEPT: {
      with(id) {
        return `/friend_requests/${id}/accept/`;
      }
    },
    with(userId) {
      return `/friend_requests/${userId}/`;
    }
  },
  FRIENDSHIPS: {
    with(userId) {
      return `/friendships/${userId}/`;
    }
  },
  TMDB: {
    MOVIES: {
      with(movieId) {
        return `/movies/${movieId}/`;
      }
    }
  },
  WATCHLIST: {
    ALL: '/watchlist_movies/',
    with(movieId) {
      return `/watchlist_movies/${movieId}/`;
    }
  },
  SEARCH: '/search/'
};

export default endpoints;
