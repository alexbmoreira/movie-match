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
    },
    JOINT_WATCHLIST: {
      with(userId) {
        return `/users/${userId}/joint_watchlist/`;
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
  MATCHLIST_LIKES: '/matchlist_likes/',
  MATCHLIST_DISLIKES: '/matchlist_dislikes/',
  SEARCH: '/search/'
};

export default endpoints;
