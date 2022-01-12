import AsyncStorage from '@react-native-async-storage/async-storage';
import { friendApi } from 'api';
import _ from 'lodash';
import { action, makeObservable, observable } from 'mobx';
import { User } from 'stores';
// import { navigate } from 'shared/RootNavigation';

class FriendsListState {
  currentUser;

  errors = {};
  friends = [];

  constructor() {
    makeObservable(this, {
      errors: observable,
      friends: observable,
      load: action.bound,
    });
  }

  async load() {
    const storedUser = await AsyncStorage.getItem('user');
    this.currentUser = JSON.parse(storedUser);

    const response = await friendApi.getFriends(this.currentUser.id);
    this.friends = _.map(response.data.results, friend => new User(friend));
  }
}

export default FriendsListState;
