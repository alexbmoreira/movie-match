import { movieApi, watchlistApi } from 'api';
import { action, makeObservable, observable } from 'mobx';
import { MovieDetailsForUser, TmdbMovie } from 'stores';

class MovieDetailsState {
  movie = {};
  movieDetailsForUser = {};

  constructor() {
    makeObservable(this, {
      movie: observable,
      movieDetailsForUser: observable,
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
    this.movieDetailsForUser = new MovieDetailsForUser(detailsForUser.data);
  }

  async addToWatchlist(currentlyInWatchlist) {
    // console.log('start');
    if(currentlyInWatchlist) {
      await watchlistApi.removeFromWatchlist({ movie: this.movie.id });
    } else {
      await watchlistApi.addToWatchlist({ movie: this.movie.id });
    }
    this.movieDetailsForUser.in_watchlist = !currentlyInWatchlist;
    // console.log('end');
  }
}

export default MovieDetailsState;
