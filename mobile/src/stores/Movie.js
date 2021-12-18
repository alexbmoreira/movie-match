import { DomainObject } from "@shared/stores";
import { observable } from 'mobx';

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
