import { profileApi } from 'api';
import { action, makeObservable, observable } from 'mobx';
import { User } from 'stores';

class ProfileState {
  userId;
  route;
  navigation;

  user = {};

  constructor() {
    makeObservable(this, {
      user: observable,
      load: action.bound
    });
  }

  receiveProps({ route, navigation }) {
    this.route = route;
    this.navigation = navigation;
    this.userId = route.params.userId;
  }

  async load() {
    this.navigation.setOptions({ title: this.route.params.username });

    const response = await profileApi.getUser(this.userId);
    this.user = new User(response.data);
  }
}

export default ProfileState;
