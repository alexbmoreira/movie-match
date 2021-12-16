import AsyncStorage from '@react-native-async-storage/async-storage';
import authApi from '@shared/api/auth';
import { navigate } from '@shared/RootNavigation';
import { action, makeObservable, observable } from 'mobx';

export default class AuthState {
  errors = {};
  username = '';
  password = '';

  constructor() {
    makeObservable(this, {
      errors: observable,
      username: observable,
      password: observable,
      login: action.bound,
      register: action.bound,
      updateUsername: action.bound,
      updateEmail: action.bound,
      updatePassword: action.bound,
      updatePassword2: action.bound
    })
  }

  updateUsername(username) {
    this.username = username
  }

  updateEmail(email) {
    this.email = email
  }

  updatePassword(password) {
    this.password = password
  }

  updatePassword2(password2) {
    this.password2 = password2
  }

  async login() {
    this.errors = {}
    const {data, errors} = await authApi.login({
      username: this.username,
      password: this.password
    });

    if(data) {
      await this.authSuccess(data.key, data.user)
    } else {
      console.log(errors)
      this.errors = errors
    }
  }

  async register() {
    this.errors = {}
    const {data, errors} = await authApi.register({
      username: this.username,
      email: this.email,
      password1: this.password,
      password2: this.password2
    });

    if(data) {
      await this.authSuccess(data.key, data.user)
    } else {
      console.log(errors)
      this.errors = errors
    }
  }

  async resolveAuth() {
    const token = await AsyncStorage.getItem('access_token');
    const user = await AsyncStorage.getItem('user');
    if (token && user) {
      navigate('Main');
    } else {
      navigate('Login')
    }
  }

  async authSuccess(key, user) {
    await AsyncStorage.setItem('access_token', key);
    await AsyncStorage.setItem('user', JSON.stringify(user));
    navigate('Main');
  }
}
