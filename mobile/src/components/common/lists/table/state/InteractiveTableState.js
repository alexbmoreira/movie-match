import _ from 'lodash';
import { action, makeObservable, observable } from 'mobx';
import { Url } from 'shared';
import { DomainStore } from 'shared/stores';

class InteractiveTableState {
  Model;
  endpoint;
  type;

  store = new DomainStore();

  models = [];
  pagination = {
    currentPage: 1,
    totalPages: 1,
    totalCount: 0
  };
  filter = {};
  loading = false;
  refreshing = false;

  constructor() {
    makeObservable(this, {
      models: observable,
      pagination: observable,
      filter: observable,
      loading: observable,
      refreshing: observable,
      load: action.bound,
      fetchResults: action.bound,
      updateModels: action.bound,
      nextPage: action.bound,
      refresh: action.bound
    });
  }

  receiveProps({ Model, endpoint, type, scopes, searchable }) {
    this.Model = Model;
    this.endpoint = endpoint;
    this.type = type;
    this.scopes = scopes;
    this.searchable = searchable;
  }

  async load() {
    this.__setDefaultFilters();
    await this.fetchResults();
  }

  async fetchResults() {
    this.loading = true;

    const composed = await this.store._compose([
      this.constructUrl()
    ]);
    const meta = composed[0].meta || {};
    const data = composed[0].data || [];

    this.updateModels(this.__getModels(data));

    this.pagination.currentPage = meta.currentPage;
  }

  updateModels(data) {
    if (!this.models.length || this.refreshing) {
      this.models = data;
    } else {
      this.models = this.models.concat(data);
    }

    this.loading = false;
  }

  updateFilter(filter) {
    _.merge(this.filter, filter);
  }

  constructUrl() {
    const url = new Url(this.endpoint);

    this.__addPaginationParams(url);
    this.__addFilterParams(url);
  
    return url.toString();
  }

  __addPaginationParams(url) {
    url.params['page'] = this.pagination.currentPage;
  }

  __addFilterParams(url) {
    _.forOwn(this.filter, (value, key) => {
      url.params[key] = value;
    });
  }

  __getModels(data) {
    const filtered = _.filter(data, { _type: this.type });

    return filtered.map(m => new this.Model(m));
  }

  __setDefaultFilters() {
    if (this.searchable) this.filter.query = '';
    if (!_.isEmpty(this.scopes)) this.filter.scope = this.scopes[0].value;
  }

  async nextPage() {
    if (!this.pagination.nextPage) return;

    this.pagination.currentPage++;
    await this.fetchResults();
  }

  async refresh() {
    this.refreshing = true;
    this.pagination = {
      currentPage: 1,
      totalPages: 1,
      totalCount: 0
    };
    await this.fetchResults();
    this.refreshing = false;
  }
}

export default InteractiveTableState;
