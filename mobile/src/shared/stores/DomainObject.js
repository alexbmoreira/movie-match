import { action, makeObservable, toJS } from 'mobx';

class DomainObject {

  constructor() {
    makeObservable(this, {
      merge: action
    })
  }

  merge(model) {
    if (!model) return;
    Object.assign(this, model);
  }

  toJS() {
    return toJS(this);
  }
}

export default DomainObject;
