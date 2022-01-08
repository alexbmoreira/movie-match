import { observable } from 'mobx';
import Movie from './Movie';
import SimpleUser from './SimpleUser';

class User extends SimpleUser {
  friends = observable([]);
  watchlist = observable([]);
  is_friend = observable();

  constructor(model) {
    super();

    if (model) {
      this.merge(model, {
        friends: [SimpleUser],
        watchlist: [Movie]
      });
    }
  }
}

export default User;
