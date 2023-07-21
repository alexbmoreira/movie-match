import { DomainStore } from 'shared/stores';
import { action, computed, makeObservable, observable } from 'mobx';
import { endpoints, types } from 'shared';
import { WatchlistMovie, TmdbMovie } from 'stores';

class MovieDetailsState {
  store = new DomainStore();

  movieId;
  route;
  navigation;

  movie = {};
  watchlistMovie = {};

  constructor() {
    makeObservable(this, {
      movie: observable,
      watchlistMovie: observable,
      load: action.bound,
      inWatchlist: computed
    });
  }

  receiveProps({ route, navigation }) {
    this.route = route;
    this.navigation = navigation;
    this.movieId = route.params.movieId.toString();
  }

  async load() {
    await this.store._compose([
      endpoints.TMDB.MOVIES.with(this.movieId),
      endpoints.WATCHLIST.with(this.movieId)
    ]);

    this.movie = new TmdbMovie(this.store._getSingle(types.TMDB.MOVIE, { id: this.movieId }));
    this.watchlistMovie = new WatchlistMovie(this.store._getSingle(types.WATCHLIST_MOVIE));
  }

  navigationConfig() {
    this.navigation.setOptions({ title: this.route.params.title });
  }

  async editWatchlist() {
  //   // TODO - Error handling
  //   if(this.inWatchlist) {
  //     await deleteRequest(endpoints.WATCHLIST.MOVIE.with(this.user.id, this.movieId));
  //     this.watchlistMovie = null;
  //   } else {
  //     const watchlistMovie = await postRequest(endpoints.WATCHLIST.with(this.user.id), { movie: this.movie.id });
  //     this.watchlistMovie = new Movie(watchlistMovie);
  //   }
  }

  get inWatchlist() {
    return !!this.watchlistMovie.id;
  }
}

export default MovieDetailsState;
