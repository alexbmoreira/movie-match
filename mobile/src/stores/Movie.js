import { observable } from 'mobx';
import { DomainObject } from 'shared/stores';

class Movie extends DomainObject {
  movie = observable(null);

  constructor(model) {
    super();

    if (model) {
      this.merge(model);
    }
  }
}

export default Movie;
