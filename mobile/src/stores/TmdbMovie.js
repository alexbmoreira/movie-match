import { computed, makeObservable, observable } from 'mobx';
import { runtimeHumanizer } from 'shared';
import { DomainObject } from 'shared/stores';
import TmdbPerson from './TmdbPerson';
import _ from 'lodash';

class TmdbMovie extends DomainObject {
  title = observable('');
  releaseYear = observable('');
  runtime = observable(null);
  overview = observable('');
  castMembers = observable([]);
  crewMembers = observable([]);

  constructor(model) {
    super();
    makeObservable(this, {
      runtimeHours: computed,
      directors: computed
    });

    if (model) {
      this.merge(model, {
        castMembers: [TmdbPerson],
        crewMembers: [TmdbPerson]
      });
    }
  }

  get runtimeHours() {
    if(!this.runtime) return null;

    return runtimeHumanizer(this.runtime * 60000);
  }

  get directors() {
    return _.filter(this.crewMembers, { knownForDepartment: 'Directing' });
  }
}

export default TmdbMovie;
