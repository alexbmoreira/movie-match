import { movieApi, watchlistApi } from 'api';
import { action, makeObservable, observable } from 'mobx';
import { TmdbMovie } from 'stores';

class MovieDetailsState {
  movie = {};
  in_watchlist = false;

  constructor() {
    makeObservable(this, {
      movie: observable,
      in_watchlist: observable,
      load: action.bound,
      setDetailsForUser: action.bound,
      addToWatchlist: action.bound,
    });
  }

  receiveProps({ route }) {
    this.movieId = route.params.movieId;
  }

  async load() {
    const response = await movieApi.getMetadata('movie', this.movieId);
    this.movie = new TmdbMovie(response.data);
    await this.setDetailsForUser();
  }

  async setDetailsForUser() {
    const detailsForUser = await movieApi.getMetadataForUser(this.movieId);
    this.in_watchlist = detailsForUser.data.in_watchlist;
  }

  async addToWatchlist(currentlyInWatchlist) {
    if(currentlyInWatchlist) {
      await watchlistApi.removeFromWatchlist({ movie: this.movie.id });
    } else {
      await watchlistApi.addToWatchlist({ movie: this.movie.id });
    }
    this.in_watchlist = !currentlyInWatchlist;
  }
}

export default MovieDetailsState;
