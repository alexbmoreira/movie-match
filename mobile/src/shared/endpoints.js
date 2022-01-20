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
  FRIENDS: {
    with(userId) {
      return `/users/${userId}/friends/`;
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
    with(userId) {
      return `/users/${userId}/watchlist/`;
    },
    MOVIE: {
      with(userId, movieId) {
        return `/users/${userId}/watchlist/${movieId}/`;
      }
    }
  },
  JOINT_WATCHLIST: {
    with(friendId) {
      return `/joint-watchlists/${friendId}/`;
    }
  },
  MATCHLIST_LIKE: {
    ALL: {
      with(friendId) {
        return `/matchlists/${friendId}/likes/`;
      }
    }
  },
  MATCHLIST_DISLIKE: {
    ALL: {
      with(friendId) {
        return `/matchlists/${friendId}/dislikes/`;
      }
    }
  },
  MATCHLIST: {
    with(friendId) {
      return `/matchlists/${friendId}/`;
    }
  },
};

export default endpoints;
