import { computed, makeObservable, observable } from 'mobx';
import { DomainObject } from 'shared/stores';

class UserAuth extends DomainObject {
  username = '';
  email = '';
  password = '';
  passwordConfirmation = '';

  constructor(model) {
    super();
    makeObservable(this, {
      username: observable,
      email: observable,
      password: observable,
      passwordConfirmation: observable,
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

export default UserAuth;
