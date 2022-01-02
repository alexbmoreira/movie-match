const endpoints = {
  AUTH: {
    LOGIN: '/rest-auth/login/',
    REGISTER: '/rest-auth/register/',
    LOGOUT: '/rest-auth/logout/'
  },
  USER: '/user/',
  FRIENDS: {
    with(userId) {
      return `/users/${userId}/friends/`;
    }
  },
  PROFILE: {
    with(userId) {
      return `/users/${userId}/`;
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
  EDIT_WATCHLIST: '/user/watchlist/',
  MOVIE_DETAILS_FOR_USER: {
    with(movieId) {
      return `/user/movie-details/${movieId}/`;
    }
  },
};

export default endpoints;
