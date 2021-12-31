import { observable } from 'mobx';
import { DomainObject } from 'shared/stores';

class MovieDetailsForUser extends DomainObject {
  in_watchlist = observable(false);

  constructor(model) {
    super();

    if (model) {
      this.merge(model);
    }
  }
}

export default MovieDetailsForUser;
