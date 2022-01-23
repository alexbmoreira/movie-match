import AsyncStorage from '@react-native-async-storage/async-storage';
import { getRequest } from 'api';
import _ from 'lodash';
import { action, makeObservable, observable } from 'mobx';
import { endpoints } from 'shared';
import { User } from 'stores';

class MatchScreenFriendsListState {
  userId;
  route;
  navigation;

  errors = {};
  friends = [];

  constructor() {
    makeObservable(this, {
      errors: observable,
      friends: observable,
      load: action.bound,
    });
  }

  receiveProps({ route, navigation }) {
    this.route = route;
    this.navigation = navigation;
    this.userId = route.params.userId;
  }

  async load() {
    if(!this.userId) {
      const storedUser = await AsyncStorage.getItem('user');
      this.userId = JSON.parse(storedUser).id;
    }

    const friends = await getRequest(endpoints.FRIENDS.with(this.userId));
    this.friends = _.map(friends.results, friend => new User(friend));
  }
}

export default MatchScreenFriendsListState;
