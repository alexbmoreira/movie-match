import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApi } from 'api';
import { action, makeObservable, observable } from 'mobx';
import { navigate } from 'shared/RootNavigation';

class ProfileSettingsState {
  errors = {};

  constructor() {
    makeObservable(this, {
      errors: observable,
      logout: action.bound,
    });
  }
  async logout() {
    this.errors = {};
    const { data, errors } = await authApi.logout();

    if(data) {
      await AsyncStorage.removeItem('access_token');
      await AsyncStorage.removeItem('user');
      navigate('Login');
    } else {
      this.errors = errors;
    }
  }
}

export default ProfileSettingsState;
