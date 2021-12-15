import AsyncStorage from '@react-native-async-storage/async-storage';
import { action, makeObservable, observable } from 'mobx';
import authApi from '../../../api/auth';
import { navigate } from '../../../RootNavigation';

export default class AuthState {
  errors = {};
  username = '';
  password = '';

  constructor() {
    makeObservable(this, {
      errors: observable,
      username: observable,
      password: observable,
      load: action.bound,
      login: action.bound,
      updateUsername: action.bound,
      updatePassword: action.bound
    })
  }

  async load() {
    try {
      const token = await AsyncStorage.getItem('access_token');
      const user = await AsyncStorage.getItem('user');
      if (token && user) {
        navigate('Main');
      }
    } catch (e) {
      console.log(e);
    }
  }

  updateUsername(username) {
    this.username = username
  }

  updatePassword(password) {
    this.password = password
  }

  async login() {
    this.errors = {}
    const {data, errors} = await authApi.login({
      username: this.username,
      password: this.password
    });

    if(data) {
      await AsyncStorage.setItem('access_token', data.key);
      await AsyncStorage.setItem('user', JSON.stringify(data.user));
      navigate('Main');
    } else {
      this.errors = errors
    }
  }
}
