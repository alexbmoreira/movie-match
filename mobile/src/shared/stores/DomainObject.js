import _ from 'lodash';
import { action, makeObservable, toJS } from 'mobx';

class DomainObject {

  constructor () {
    makeObservable(this, {
      merge: action
    })
  }

  merge(model) {
    if (!model) return;
    _.merge(this, model);
  }

  toJS() {
    return toJS(this);
  }
}

export default DomainObject;
