import { profileApi } from 'api';
import { action, makeObservable, observable } from 'mobx';
import { User } from 'stores';

class ProfileState {
  userId;
  user = {};

  constructor() {
    makeObservable(this, {
      user: observable,
      load: action.bound
    });
  }

  receiveProps({ route }) {
    this.userId = route.params.userId;
  }

  async load() {
    const response = await profileApi.getProfile(this.userId);
    this.user = new User(response.data);
  }
}

export default ProfileState;
