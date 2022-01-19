import { getRequest } from 'api';
import _ from 'lodash';
import { action, makeObservable, observable } from 'mobx';
import { endpoints } from 'shared';
import { TmdbMovie } from 'stores';

class MatchlistState {
  route;
  navigation;
  friendId;

  errors = {};
  matches = [];

  constructor() {
    makeObservable(this, {
      errors: observable,
      matches: observable,
      load: action.bound,
      getMatchlistMetadata: action.bound
    });
  }

  receiveProps({ route, navigation }) {
    this.route = route;
    this.navigation = navigation;
    this.friendId = route.params.friendId;
  }

  async load() {
    const matches = await getRequest(endpoints.MATCHLIST.with(this.friendId));
    this.matches = await this.getMatchlistMetadata(matches.results);
  }

  async getMatchlistMetadata(matches) {
    return Promise.all(_.map(matches, async (movie) => {
      const likedMovie = await getRequest(endpoints.TMDB.DATA.with('movie', movie.movie));
      return new TmdbMovie(likedMovie);
    }));
  }
}

export default MatchlistState;
