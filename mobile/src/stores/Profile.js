import { DomainObject } from '@shared/stores';
import { observable } from 'mobx';
import Movie from './Movie';
import User from './User';

class Profile extends DomainObject {
  user = observable({});
  friends = observable([]);
  watchlist = observable([]);

  constructor(model) {
    super();

    if (model) {
      this.merge(model, {
        user: User,
        friends: [User],
        watchlist: [Movie]
      });
    }
  }
}

export default Profile;
