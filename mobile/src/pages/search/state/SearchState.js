import { movieApi } from 'api';
import { action, makeObservable, observable } from 'mobx';

class SearchState {
  query = '';
  type = 'movies';
  results = [];

  constructor() {
    makeObservable(this, {
      query: observable,
      type: observable,
      results: observable,
      updateQuery: action.bound,
      updateType: action.bound,
      search: action.bound
    });
  }

  updateQuery(query) {
    this.query = query;
  }

  updateType(type) {
    this.type = type;
  }

  async search() {
    const searchParams = { params: { search: this.query } };
    const response = await movieApi.makeSearch(this.type, searchParams);
    this.results = response.data.results;
  }
}

export default SearchState;
