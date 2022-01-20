import { getRequest } from 'api';
import _ from 'lodash';
import { action, makeObservable, observable } from 'mobx';
import { endpoints } from 'shared';
import { TmdbMovie } from 'stores';

class LikesListState {
  route;
  navigation;
  friendId;

  errors = {};
  likes = [];

  constructor() {
    makeObservable(this, {
      errors: observable,
      likes: observable,
      load: action.bound,
      getLikesListMetadata: action.bound
    });
  }

  receiveProps({ route, navigation }) {
    this.route = route;
    this.navigation = navigation;
    this.friendId = route.params.friendId;
  }

  async load() {
    const likes = await getRequest(endpoints.MATCHLIST_LIKE.ALL.with(this.friendId));
    this.likes = await this.getLikesListMetadata(likes.results);
  }

  async getLikesListMetadata(likes) {
    return Promise.all(_.map(likes, async (movie) => {
      const likedMovie = await getRequest(endpoints.TMDB.DATA.with('movie', movie.movie));
      return new TmdbMovie(likedMovie);
    }));
  }
}

export default LikesListState;
