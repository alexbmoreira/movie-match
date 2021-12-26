import { computed, makeObservable, observable } from 'mobx';
import { runtimeHumanizer } from 'shared';
import { DomainObject } from 'shared/stores';

class TmdbMovie extends DomainObject {
  title = observable('');
  release_year = observable('');
  runtime = observable(null);
  overview = observable('');

  constructor(model) {
    super();
    makeObservable(this, {
      runtimeHours: computed
    });

    if (model) {
      this.merge(model);
    }
  }

  get runtimeHours() {
    return runtimeHumanizer(this.runtime * 60000);
  }
}

export default TmdbMovie;
