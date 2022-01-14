import { getRequest } from 'api';
import _ from 'lodash';
import { action, makeObservable, observable } from 'mobx';
import { endpoints } from 'shared';
import { Movie } from 'stores';

class WatchlistState {
  watchlist = [];

  constructor() {
    makeObservable(this, {
      watchlist: observable,
      load: action.bound
    });
  }

  receiveProps({ watchlist }) {
    this.watchlist = watchlist;
  }

  async load() {
    this.watchlist = await this.getWatchlistMetadata();
  }

  async getWatchlistMetadata() {
    return Promise.all(_.map(this.watchlist, async (movie) => {
      const watchlistMovie = await getRequest(endpoints.TMDB.DATA.with('movie', movie.movie));
      return new Movie(watchlistMovie);
    }));
  }
}

export default WatchlistState;
