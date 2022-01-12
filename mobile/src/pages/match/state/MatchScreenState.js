// import AsyncStorage from '@react-native-async-storage/async-storage';
import { matchlistApi } from 'api';
import _ from 'lodash';
import { action, makeObservable, observable } from 'mobx';
import { Movie } from 'stores';
import { profileApi } from '../../../api';
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
    const userResponse = await profileApi.getUser(this.friendId);
    this.friend = userResponse.data;
    const response = await matchlistApi.getJointWatchlist(this.friendId);
    this.jointWatchlist = _.map(response.data.results, (movie) => new Movie(movie));
  }

  navigationConfig() {
    this.navigation.setOptions({ title: this.friend.username });
  }
}

export default MatchScreenState;
