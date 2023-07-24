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
    },
    MATCHLIST: {
      with(userId) {
        return `/users/${userId}/matchlist/`;
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
  MATCHLIST_LIKES: {
    ALL: '/matchlist_likes/',
    WITH_USER: {
      with(userId) {
        return `/matchlist_likes/with_user/${userId}`;
      }
    }
  },
  MATCHLIST_DISLIKES: {
    ALL: '/matchlist_dislikes/',
    WITH_USER: {
      with(userId) {
        return `/matchlist_dislikes/with_user/${userId}`;
      }
    }
  },
  SEARCH: '/search/'
};

export default endpoints;
