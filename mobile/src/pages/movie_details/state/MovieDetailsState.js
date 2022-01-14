import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteRequest, getRequest, postRequest } from 'api';
import { action, makeObservable, observable } from 'mobx';
import { endpoints } from 'shared';
import { TmdbMovie, User } from 'stores';

class MovieDetailsState {
  movieId;
  route;
  navigation;

  movie = {};
  user = {};
  in_watchlist = false;

  constructor() {
    makeObservable(this, {
      user: observable,
      movie: observable,
      in_watchlist: observable,
      load: action.bound,
      setDetailsForUser: action.bound,
      addToWatchlist: action.bound,
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
    const detailsForUser = await getRequest(endpoints.MOVIE_DETAILS_FOR_USER.with(this.movieId));
    this.in_watchlist = detailsForUser.data.in_watchlist;
    console.log(detailsForUser.data);
  }

  async addToWatchlist(currentlyInWatchlist) {
    if(currentlyInWatchlist) {
      await deleteRequest(endpoints.WATCHLIST.MOVIE.with(this.user.id, this.movieId));
    } else {
      await postRequest(endpoints.WATCHLIST.with(this.user.id), { movie: this.movie.id });
    }
    this.in_watchlist = !currentlyInWatchlist;
  }
}

export default MovieDetailsState;
