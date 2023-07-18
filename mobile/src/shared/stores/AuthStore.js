import { makeAutoObservable } from 'mobx';

class AuthStore {
  userId = null;
  username = null;

  constructor() {
    makeAutoObservable(this);
  }

  login(userId, username) {
    this.userId = userId;
    this.username = username;
  }

  logout() {
    this.userId = null;
    this.username = null;
  }
}

export default new AuthStore();
