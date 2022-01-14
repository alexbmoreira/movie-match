import AsyncStorage from '@react-native-async-storage/async-storage';
import { postRequest } from 'api';
import { action, makeObservable, observable } from 'mobx';
import { endpoints } from 'shared';
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
    const data = await postRequest(endpoints.AUTH.LOGOUT);

    if(!data.errors) {
      await AsyncStorage.removeItem('access_token');
      await AsyncStorage.removeItem('user');
      navigate('Login');
    } else {
      this.errors = data.errors;
    }
  }
}

export default ProfileSettingsState;
