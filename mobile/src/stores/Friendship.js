import { observable } from 'mobx';
import { DomainObject } from 'shared/stores';
import User from './User';

class Friendship extends DomainObject {
  user = observable(null);
  friend = observable(null);

  constructor(model) {
    super();

    if (model) {
      this.merge(model, {
        user: User,
        friend: User
      });
    }
  }
}

export default Friendship;
