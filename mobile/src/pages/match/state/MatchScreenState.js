// import AsyncStorage from '@react-native-async-storage/async-storage';
import { getRequest } from 'api';
import _ from 'lodash';
import { action, makeObservable, observable } from 'mobx';
import { endpoints } from 'shared';
import { User } from 'stores';
import TmdbMovie from '../../../stores/TmdbMovie';
// import { navigate } from 'shared/RootNavigation';

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
}

export default MatchScreenState;
