import { getRequest, postRequest } from 'api';
import _ from 'lodash';
import { action, makeObservable, observable } from 'mobx';
import { endpoints } from 'shared';
import { TmdbMovie, User } from 'stores';

class MatchScreenState {
  errors = {};
  friend = {};
  jointWatchlist = [];

  constructor() {
    makeObservable(this, {
      errors: observable,
      friend: observable,
      jointWatchlist: observable,
      load: action.bound,
      likeMovie: action.bound
    });
  }

  receiveProps({ route, navigation }) {
    this.route = route;
    this.navigation = navigation;
    this.friendId = route.params.friendId;
  }

  async load() {
    const friend = await getRequest(endpoints.PROFILE.with(this.friendId));
    this.friend = new User(friend);

    const jointWatchlist = await getRequest(endpoints.JOINT_WATCHLIST.with(this.friendId));
    this.jointWatchlist = await this.getJointWatchlistMetadata(jointWatchlist.results);
  }

  navigationConfig() {
    this.navigation.setOptions({ title: this.friend.username });
  }

  async getJointWatchlistMetadata(jointWatchlist) {
    return Promise.all(_.map(jointWatchlist, async (movie) => {
      const jointWatchlistMovie = await getRequest(endpoints.TMDB.DATA.with('movie', movie.movie));
      return new TmdbMovie(jointWatchlistMovie);
    }));
  }

  async likeMovie(movie) {
    await postRequest(
      endpoints.MATCHLIST_LIKE.ALL.with(this.friendId),
      { movie: movie.id }
    );
  }

  async dislikeMovie(movie) {
    await postRequest(
      endpoints.MATCHLIST_DISLIKE.ALL.with(this.friendId),
      { movie: movie.id }
    );
  }
}

export default MatchScreenState;
