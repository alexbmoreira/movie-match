import { makeAutoObservable } from 'mobx';

class AuthStore {
  user = {};

  constructor() {
    makeAutoObservable(this);
  }

  login(user) {
    this.user = user;
  }

  logout() {
    this.user = {};
  }
}

export default new AuthStore();
