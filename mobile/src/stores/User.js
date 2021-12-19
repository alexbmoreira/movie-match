import { DomainObject } from '@shared/stores';
import { observable } from 'mobx';

class User extends DomainObject {
  username = observable('');

  constructor(model) {
    super();

    if (model) {
      this.merge(model);
    }
  }
}

export default User;
