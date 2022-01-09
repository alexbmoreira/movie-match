import { observable } from 'mobx';
import { DomainObject } from 'shared/stores';
import SimpleUser from './SimpleUser';

class FriendRequest extends DomainObject {
  creator = observable();
  receiver = observable();

  constructor(model) {
    super();

    if (model) {
      this.merge(model, {
        creator: SimpleUser,
        receiver: SimpleUser
      });
    }
  }
}

export default FriendRequest;
