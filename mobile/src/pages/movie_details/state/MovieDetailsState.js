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
      editWatchlist: action,
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
    // TODO - Error handling
    if(this.inWatchlist) {
      await this.store.destroy(this.watchlistMovie);
      this.watchlistMovie = {};
    } else {
      const { model } = await this.store.post(
        endpoints.WATCHLIST.ALL,
        types.WATCHLIST_MOVIE,
        { movieId: this.movie.id }
      );
      this.watchlistMovie = new WatchlistMovie(model);
    }
  }

  get inWatchlist() {
    return !!this.watchlistMovie.id;
  }
}

export default MovieDetailsState;
