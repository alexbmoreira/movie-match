import { observable } from 'mobx';
import { DomainObject } from 'shared/stores';
import SimpleUser from './SimpleUser';

class Friendship extends DomainObject {
  user = observable(null);
  friend = observable(null);

  constructor(model) {
    super();

    if (model) {
      this.merge(model, {
        user: SimpleUser,
        friend: SimpleUser
      });
    }
  }
}

export default Friendship;
