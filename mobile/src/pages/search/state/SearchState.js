import { movieApi } from 'api';
import { action, makeObservable, observable } from 'mobx';

class SearchState {
  query = '';
  type = 'movies';
  isLoading = false;
  results = [];

  constructor() {
    makeObservable(this, {
      query: observable,
      type: observable,
      results: observable,
      isLoading: observable,
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
    if(!this.query || !this.type) return;
    this.isLoading = true;

    const searchParams = { params: { search: this.query } };
    const response = await movieApi.makeSearch(this.type, searchParams);
    this.results = response.data.results;

    this.isLoading = false;
  }
}

export default SearchState;
