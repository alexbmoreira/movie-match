import { profileApi } from '@shared/api';
import { action, makeObservable, observable } from 'mobx';
import { Profile } from 'stores';

class ProfileState {
  profile = {};

  constructor() {
    makeObservable(this, {
      profile: observable,
      load: action.bound
    })
  }

  async load() {
    const r = await profileApi.getProfile(44)
    this.profile = new Profile(r.data)
  }
}

export default ProfileState;
