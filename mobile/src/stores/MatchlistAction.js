import { observable } from 'mobx';
import { DomainObject } from 'shared/stores';
import TmdbMovie from './TmdbMovie';

class MatchlistAction extends DomainObject {
  createdAt = observable('');
  movie = observable(null);

  constructor(model) {
    super();

    if (model) {
      this.merge(model, {
        movie: TmdbMovie
      });
    }
  }
}

export default MatchlistAction;
