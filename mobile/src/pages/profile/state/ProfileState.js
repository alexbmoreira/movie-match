import { action, makeObservable, observable } from 'mobx';
import { profileApi } from 'shared/api';
import { Profile } from 'stores';

class ProfileState {
  userId;
  profile = {};

  constructor() {
    makeObservable(this, {
      profile: observable,
      load: action.bound
    });
  }

  receiveProps({ route }) {
    this.userId = route.params.userId;
  }

  async load() {
    const response = await profileApi.getProfile(this.userId);
    this.profile = new Profile(response.data);
  }
}

export default ProfileState;
