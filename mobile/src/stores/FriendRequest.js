import { observable } from 'mobx';
import { DomainObject } from 'shared/stores';
import User from './User';

class FriendRequest extends DomainObject {
  creator = observable(null);
  receiver = observable(null);

  constructor(model) {
    super();

    if (model) {
      this.merge(model, {
        creator: User,
        receiver: User
      });
    }
  }
}

export default FriendRequest;
