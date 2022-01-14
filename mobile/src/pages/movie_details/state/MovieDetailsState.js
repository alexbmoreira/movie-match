import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteRequest, getRequest, postRequest } from 'api';
import { action, computed, makeObservable, observable } from 'mobx';
import { endpoints } from 'shared';
import { Movie, TmdbMovie, User } from 'stores';

class MovieDetailsState {
  movieId;
  route;
  navigation;

  movie = {};
  user = {};
  watchlistMovie = {};

  constructor() {
    makeObservable(this, {
      user: observable,
      movie: observable,
      watchlistMovie: observable,
      load: action.bound,
      setDetailsForUser: action.bound,
      addToWatchlist: action.bound,
      inWatchlist: computed
    });
  }

  receiveProps({ route, navigation }) {
    this.route = route;
    this.navigation = navigation;
    this.movieId = route.params.movieId;
  }

  async load() {
    const storedUser = await AsyncStorage.getItem('user');
    this.user = new User(JSON.parse(storedUser));

    const response = await getRequest(endpoints.TMDB.DATA.with('movie', this.movieId));
    this.movie = new TmdbMovie(response.data);
    await this.setDetailsForUser();
  }

  navigationConfig() {
    this.navigation.setOptions({ title: this.route.params.title });
  }

  async setDetailsForUser() {
    const response = await getRequest(endpoints.WATCHLIST.MOVIE.with(this.user.id, this.movieId));
    this.watchlistMovie = new Movie(response.data);
  }

  async addToWatchlist() {
    if(this.inWatchlist) {
      await deleteRequest(endpoints.WATCHLIST.MOVIE.with(this.user.id, this.movieId));
      this.watchlistMovie = null;
    } else {
      const response = await postRequest(endpoints.WATCHLIST.with(this.user.id), { movie: this.movie.id });
      this.watchlistMovie = new Movie(response.data);
    }
  }

  get inWatchlist() {
    return this.watchlistMovie?.toJS().id;
  }
}

export default MovieDetailsState;
