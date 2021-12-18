import { DomainObject } from "@shared/stores";
import { observable } from 'mobx';

class Profile extends DomainObject {
  user = observable({});
  friends = observable([]);
  watchlist = observable([]);

  constructor(model) {
    super();

    if (model) {
      this.merge(model);
    }
  }
}

export default Profile;
