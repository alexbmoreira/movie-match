import { movieApi, watchlistApi } from 'api';
import { action, makeObservable, observable } from 'mobx';
import TmdbMovie from 'stores/TmdbMovie';

class MovieDetailsState {
  movie = {};

  constructor() {
    makeObservable(this, {
      movie: observable,
      load: action.bound,
      addToWatchlist: action.bound
    });
  }

  receiveProps({ route }) {
    this.movieId = route.params.movieId;
  }

  async load() {
    const response = await movieApi.getMetadata('movie', this.movieId);
    this.movie = new TmdbMovie(response.data);
    const detailsForUser = await movieApi.getMetadataForUser(this.movieId);
    this.movie.in_watchlist = detailsForUser.data.in_watchlist;
  }

  async addToWatchlist(currentlyInWatchlist) {
    if(currentlyInWatchlist) {
      await watchlistApi.removeFromWatchlist({ movie: this.movie.id });
    } else {
      await watchlistApi.addToWatchlist({ movie: this.movie.id });
    }
    this.movie.in_watchlist = !currentlyInWatchlist;
  }
}

export default MovieDetailsState;
