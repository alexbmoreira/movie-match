import AsyncStorage from '@react-native-async-storage/async-storage';
import { postRequest } from 'api';
import { action, makeObservable, observable } from 'mobx';
import { endpoints } from 'shared';
import { authStore } from 'shared/stores';
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
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      authStore.logout();
      navigate('Login');
    } else {
      this.errors = data.errors;
    }
  }
}

export default ProfileSettingsState;
