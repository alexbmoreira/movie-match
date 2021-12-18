import { DomainObject } from "@shared/stores";
import { makeObservable, observable } from 'mobx';

class Profile extends DomainObject {
  user = {};
  friends = [];
  watchlist = [];

  constructor(model) {
    super(model);
    makeObservable(this, {
      user: observable,
      friends: observable,
      watchlist: observable
    });

    if (model) {
      this.merge(model);
    }
  }
}

export default Profile;
