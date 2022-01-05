const endpoints = {
  AUTH: {
    LOGIN: '/rest-auth/login/',
    REGISTER: '/rest-auth/register/',
    LOGOUT: '/rest-auth/logout/'
  },
  USER: '/user/',
  PROFILE: {
    with(userId) {
      return `/users/${userId}/`;
    },
    WATCHLIST: {
      with(userId) {
        return `/users/${userId}/watchlist`;
      }
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
