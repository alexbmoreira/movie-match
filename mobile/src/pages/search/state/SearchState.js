import { getRequest } from 'api';
import _ from 'lodash';
import { action, makeObservable, observable } from 'mobx';
import { endpoints } from 'shared';
import { SimpleUser } from 'stores';

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

    const params = { search: this.query };
    this.type === 'users' ? await this.searchUsers(params) : await this.searchTMDB(params);

    this.isLoading = false;
  }

  async searchTMDB(params) {
    const results = await getRequest(endpoints.TMDB.SEARCH.with(this.type), params);
    this.results = results.results;
  }

  async searchUsers(params) {
    const results = await getRequest(endpoints.PROFILE.SEARCH, params);
    this.results = _.map(results.results, (user) => new SimpleUser(user));
  }
}

export default SearchState;
