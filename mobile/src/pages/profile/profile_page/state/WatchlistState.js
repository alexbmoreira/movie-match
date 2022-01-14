import { getRequest } from 'api';
import _ from 'lodash';
import { action, makeObservable, observable } from 'mobx';
import { endpoints } from 'shared';

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
      const response = await getRequest(endpoints.TMDB.DATA.with('movie', movie.movie));
      return response.data;
    }));
  }
}

export default WatchlistState;
