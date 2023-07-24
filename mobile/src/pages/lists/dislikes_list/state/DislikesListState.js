import { getRequest } from 'api';
import _ from 'lodash';
import { action, makeObservable, observable } from 'mobx';
import { endpoints } from 'shared';
import { TmdbMovie } from 'stores';

class DislikesListState {
  route;
  navigation;
  friendId;

  errors = {};
  dislikes = [];

  constructor() {
    makeObservable(this, {
      errors: observable,
      dislikes: observable,
      load: action.bound,
      getDislikesListMetadata: action.bound
    });
  }

  receiveProps({ route, navigation }) {
    this.route = route;
    this.navigation = navigation;
    this.friendId = route.params.friendId;
  }

  async load() {
    const dislikes = await getRequest(endpoints.MATCHLIST_DISLIKE.with(this.friendId));
    this.dislikes = await this.getDislikesListMetadata(dislikes.results);
  }

  async getDislikesListMetadata(dislikes) {
    return Promise.all(_.map(dislikes, async (movie) => {
      const likedMovie = await getRequest(endpoints.TMDB.DATA.with('movie', movie.movie));
      return new TmdbMovie(likedMovie);
    }));
  }
}

export default DislikesListState;
