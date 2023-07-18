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
    }
  },
  WATCHLIST: {
    FOR_USER: {
      with(userId) {
        return `/watchlist_movies/list_for_user/${userId}/`;
      }
    }
  }
};

export default endpoints;
