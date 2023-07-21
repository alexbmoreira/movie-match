import AsyncStorage from '@react-native-async-storage/async-storage';
import { action, makeObservable, observable } from 'mobx';
import { endpoints, types } from 'shared';
import { navigate } from 'shared/RootNavigation';
import { authStore, DomainStore } from 'shared/stores';
import { UserAuth } from 'stores';

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
    const { model, errors } = await this.store.post(
      endpoints.AUTH.LOGIN,
      types.USER,
      this.user
    );

    this.errors = errors;
    if (model) {
      this.authSuccess(model);
    }
  }

  async register() {
    const { model, errors } = await this.store.post(
      endpoints.AUTH.REGISTER,
      types.USER,
      this.user
    );

    this.errors = errors;
    if (model) {
      this.authSuccess(model);
    }
  }

  async resolveAuth() {
    const token = await AsyncStorage.getItem('token');
    const user = await AsyncStorage.getItem('user');
    if (token && user) {
      authStore.login(JSON.parse(user));
      navigate('Main', { userId: JSON.parse(user).id, username: JSON.parse(user).username });
    } else {
      navigate('Login');
    }
  }

  async authSuccess(user) {
    await AsyncStorage.setItem('token', user.token);
    await AsyncStorage.setItem('user', JSON.stringify(user));
    authStore.login(user);
    navigate('Main', { userId: user.id, username: user.username });
  }
}

export default AuthState;
