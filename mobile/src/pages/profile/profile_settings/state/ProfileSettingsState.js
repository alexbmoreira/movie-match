import AsyncStorage from '@react-native-async-storage/async-storage';
import { action, makeObservable } from 'mobx';
import { authStore } from 'shared/stores';
import { navigate } from 'shared/RootNavigation';

class ProfileSettingsState {

  constructor() {
    makeObservable(this, {
      logout: action.bound,
    });
  }
  async logout() {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    authStore.logout();
    navigate('Login');
  }
}

export default ProfileSettingsState;
