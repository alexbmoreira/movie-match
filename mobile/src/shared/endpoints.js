const endpoints = {
  AUTH: {
    LOGIN: '/sessions/login_user/',
    REGISTER: '/sessions/register/',
    LOGOUT: '/sessions/logout/'
  },
  USER: {
    with(userId) {
      return `/users/${userId}/`;
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
