import { getRequest } from 'api';
import _ from 'lodash';
import { action, makeObservable, observable } from 'mobx';
import { endpoints } from 'shared';
import { TmdbMovie } from 'stores';

class WatchlistState {
  route;
  navigation;
  userId;

  errors = {};
  matches = [];

  constructor() {
    makeObservable(this, {
      errors: observable,
      matches: observable,
      load: action.bound,
      getWatchlistMetadata: action.bound
    });
  }

  receiveProps({ route, navigation }) {
    this.route = route;
    this.navigation = navigation;
    this.userId = route.params.userId;
  }

  async load() {
    const watchlistMovies = await getRequest(endpoints.WATCHLIST.with(this.userId));
    this.watchlistMovies = await this.getWatchlistMetadata(watchlistMovies.results);
  }

  async getWatchlistMetadata(watchlistMovies) {
    return Promise.all(_.map(watchlistMovies, async (movie) => {
      const watchlistMovie = await getRequest(endpoints.TMDB.DATA.with('movie', movie.movie));
      return new TmdbMovie(watchlistMovie);
    }));
  }
}

export default WatchlistState;
