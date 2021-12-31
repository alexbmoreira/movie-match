import { computed, makeObservable, observable } from 'mobx';
import { runtimeHumanizer } from 'shared';
import { DomainObject } from 'shared/stores';

class TmdbMovie extends DomainObject {
  title = observable('');
  release_year = observable('');
  runtime = observable(null);
  overview = observable('');
  in_watchlist = observable(false);

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
    if(!this.runtime) return null;

    return runtimeHumanizer(this.runtime * 60000);
  }
}

export default TmdbMovie;
