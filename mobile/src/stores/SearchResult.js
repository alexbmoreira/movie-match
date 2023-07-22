import { makeObservable, observable, computed } from 'mobx';
import { DomainObject } from 'shared/stores';
import TmdbMovie from './TmdbMovie';
import User from './User';
import TmdbPerson from './TmdbPerson';

class SearchResult extends DomainObject {
  resultType = '';
  args = {};

  constructor(model) {
    super();
    makeObservable(this, {
      resultType: observable,
      args: observable,
      isMovie: computed,
      isPerson: computed,
      isUser: computed,
      movie: computed,
      person: computed,
      user: computed
    });
    if (model) {
      this.merge(model);
    }
  }

  get isMovie() {
    return this.resultType === 'movie';
  }

  get isPerson() {
    return this.resultType === 'person';
  }

  get isUser() {
    return this.resultType === 'user';
  }

  get movie() {
    return new TmdbMovie(this.args);
  }

  get person() {
    return new TmdbPerson(this.args);
  }

  get user() {
    return new User(this.args);
  }
}

export default SearchResult;
