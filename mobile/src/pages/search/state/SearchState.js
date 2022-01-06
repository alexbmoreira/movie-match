import { movieApi, profileApi } from 'api';
import _ from 'lodash';
import { action, makeObservable, observable } from 'mobx';
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

    const searchParams = { search: this.query };
    this.type === 'users' ? await this.searchUsers(searchParams) : await this.searchTMDB(searchParams);

    this.isLoading = false;
  }

  async searchTMDB(searchParams) {
    const response = await movieApi.makeSearch(this.type, searchParams);
    this.results = response.data.results;
  }

  async searchUsers(searchParams) {
    const response = await profileApi.searchUsers(searchParams);
    this.results = _.map(response.data.results, (user) => new SimpleUser(user));
  }
}

export default SearchState;
