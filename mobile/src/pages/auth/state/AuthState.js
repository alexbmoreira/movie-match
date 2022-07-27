import AsyncStorage from '@react-native-async-storage/async-storage';
import { action, makeObservable, observable } from 'mobx';
import { endpoints, types } from 'shared';
import { navigate } from 'shared/RootNavigation';
import { DomainStore } from 'shared/stores';
import { UserAuth } from 'stores';
import _ from 'lodash';

class AuthState {
  store = new DomainStore();

  errors = {};
  user = {};

  constructor() {
    makeObservable(this, {
      errors: observable,
      user: observable,
      load: action.bound,
      login: action.bound,
      register: action.bound
    });
  }

  async load() {
    this.user = new UserAuth();
  }

  async login() {
    const { response, model, errors } = await this.store.post(
      endpoints.AUTH.LOGIN,
      types.USER,
      this.user
    );

    this.errors = errors;
    if (model) {
      this.authSuccess(_.get(response, 'headers.set-cookie')[0], model);
    }
  }

  async register() {
    const { response, model, errors } = await this.store.post(
      endpoints.AUTH.REGISTER,
      types.USER,
      this.user
    );

    this.errors = errors;
    if (model) {
      this.authSuccess(_.get(response, 'headers.set-cookie')[0], model);
    }
  }

  async resolveAuth() {
    const token = await AsyncStorage.getItem('set-cookie');
    const user = await AsyncStorage.getItem('user');
    if (token && user) {
      navigate('Main', { userId: JSON.parse(user).id, username: JSON.parse(user).username });
    } else {
      navigate('Login');
    }
  }

  async authSuccess(key, user) {
    await AsyncStorage.setItem('set-cookie', key);
    await AsyncStorage.setItem('user', JSON.stringify(user));
    navigate('Main', { userId: user.id, username: user.username });
  }
}

export default AuthState;
