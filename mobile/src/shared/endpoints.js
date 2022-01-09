const endpoints = {
  AUTH: {
    LOGIN: '/rest-auth/login/',
    REGISTER: '/rest-auth/register/',
    LOGOUT: '/rest-auth/logout/'
  },
  USER: '/user/',
  PROFILE: {
    SEARCH: '/users/',
    with(userId) {
      return `/users/${userId}/`;
    },
    WATCHLIST: {
      with(userId) {
        return `/users/${userId}/watchlist/`;
      }
    }
  },
  FRIEND_REQUESTS: '/friend-requests/',
  FRIEND_REQUEST: {
    WITH_USER: {
      with(userId) {
        return `/friend-requests/with-user/${userId}/`;
      }
    },
    ACCEPT: {
      with(requestId) {
        return `/friend-requests/${requestId}/accept/`;
      }
    },
    with(friendRequestId) {
      return `/friend-requests/${friendRequestId}/`;
    }
  },
  FRIENDSHIP: {
    WITH_USER: {
      with(userId) {
        return `/friendships/with-user/${userId}/`;
      }
    },
    with(friendshipId) {
      return `/friendships/${friendshipId}/`;
    }
  },
  TMDB: {
    SEARCH: {
      with(searchType) {
        return `/movies/${searchType}/`;
      }
    },
    DATA: { 
      with(type, id) {
        return `/movies/${type}/${id}/`;
      }
    }
  },
  WATCHLIST: {
    POST: '/user/watchlist/',
    DELETE: {
      with(movieId) {
        return `/user/watchlist/${movieId}/`;
      }
    }
  },
  MOVIE_DETAILS_FOR_USER: {
    with(movieId) {
      return `/user/movie-details/${movieId}/`;
    }
  },
};

export default endpoints;
