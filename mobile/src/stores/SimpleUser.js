import { computed, makeObservable, observable } from 'mobx';
import { DomainObject } from 'shared/stores';

class SimpleUser extends DomainObject {
  username = observable('');
  avatar_color = observable('');

  constructor(model) {
    super();
    makeObservable(this, {
      userInitial: computed
    });

    if (model) {
      this.merge(model);
    }
  }

  get userInitial() {
    return this.username.toUpperCase().charAt(0);
  }
}

export default SimpleUser;
