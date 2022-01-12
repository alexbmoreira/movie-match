// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { authApi } from 'api';
import { action, makeObservable, observable } from 'mobx';
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

  async load() {
    console.log('load');
  }
}

export default MatchScreenState;
