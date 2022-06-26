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
  }
};

export default endpoints;
