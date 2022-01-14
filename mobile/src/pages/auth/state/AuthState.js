import AsyncStorage from '@react-native-async-storage/async-storage';
import { postRequest } from 'api';
import { action, makeObservable, observable } from 'mobx';
import { endpoints } from 'shared';
import { navigate } from 'shared/RootNavigation';

class AuthState {
  errors = {};
  username = '';
  email = '';
  password = '';
  password2 = '';

  constructor() {
    makeObservable(this, {
      errors: observable,
      username: observable,
      email: observable,
      password: observable,
      password2: observable,
      login: action.bound,
      register: action.bound,
      updateUsername: action.bound,
      updateEmail: action.bound,
      updatePassword: action.bound,
      updatePassword2: action.bound
    });
  }

  updateUsername(username) {
    this.username = username;
  }

  updateEmail(email) {
    this.email = email;
  }

  updatePassword(password) {
    this.password = password;
  }

  updatePassword2(password2) {
    this.password2 = password2;
  }

  async login() {
    this.errors = {};
    const { data, errors } = await postRequest(
      endpoints.AUTH.LOGIN,
      {
        username: this.username,
        password: this.password
      }
    );

    if(data) {
      await this.authSuccess(data.key, data.user);
    } else {
      this.errors = errors;
    }
  }

  async register() {
    this.errors = {};
    const { data, errors } = await postRequest(
      endpoints.AUTH.REGISTER,
      {
        username: this.username,
        email: this.email,
        password1: this.password,
        password2: this.password2
      }
    );

    if(data) {
      await this.authSuccess(data.key, data.user);
    } else {
      this.errors = errors;
    }
  }

  async resolveAuth() {
    const token = await AsyncStorage.getItem('access_token');
    const user = await AsyncStorage.getItem('user');
    if (token && user) {
      navigate('Main', { userId: JSON.parse(user).id, username: JSON.parse(user).username });
    } else {
      navigate('Login');
    }
  }

  async authSuccess(key, user) {
    await AsyncStorage.setItem('access_token', key);
    await AsyncStorage.setItem('user', JSON.stringify(user));
    navigate('Main', { userId: user.id, username: user.username });
  }
}

export default AuthState;
