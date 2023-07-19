import { observable } from 'mobx';
import { DomainObject } from 'shared/stores';

class TmdbPerson extends DomainObject {
  name = observable('');
  knownForDepartment = observable('');
  profilePath = observable('');

  constructor(model) {
    super();

    if (model) {
      this.merge(model);
    }
  }
}

export default TmdbPerson;
