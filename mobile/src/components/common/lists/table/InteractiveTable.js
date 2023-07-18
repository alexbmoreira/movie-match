import _ from 'lodash';
import { action, makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import { Url, withState } from 'shared';
import Table from './Table';
import { DomainStore } from 'shared/stores';

class InteractiveTableState {
  Model;
  endpoint;
  type;

  store = new DomainStore();

  models = [];
  pagination = {
    currentPage: 1,
    nextPage: null,
    previousPage: null,
    totalPages: 1,
    totalCount: 0
  };
  loading = false;

  constructor() {
    makeObservable(this, {
      models: observable,
      pagination: observable,
      loading: observable,
      load: action.bound,
      fetchResults: action.bound,
      updateModels: action.bound,
      nextPage: action.bound
    });
  }

  receiveProps({ Model, endpoint, type }) {
    this.Model = Model;
    this.endpoint = endpoint;
    this.type = type;
  }

  async load() {
    await this.fetchResults();
  }

  async fetchResults() {
    this.loading = true;
    
    const composed = await this.store._compose([
      this.constructUrl(this.endpoint, this.pagination)
    ]);
    const meta = composed[0].meta || {};
    const data = composed[0].data || [];

    this.updateModels(_.map(this.__getModels(data)));

    this.pagination.currentPage = meta.currentPage;
    this.pagination.nextPage = meta.nextPage;
    this.pagination.previousPage = meta.previousPage;
  }

  updateModels(data) {
    if (!this.models.length) {
      this.models = data;
    } else {
      this.models = this.models.concat(data);
    }

    this.loading = false;
  }

  constructUrl(endpoint, pagination) {
    const url = new Url(endpoint);

    this.__addPaginationParams(url, pagination);
  
    return url.toString();
  }

  __addPaginationParams(url, pagination) {
    url.params['page'] = pagination.currentPage;
  }

  __getModels(data) {
    const filtered = _.filter(data, { _type: this.type });

    return filtered.map(m => new this.Model(m));
  }

  async nextPage() {
    if (!this.pagination.nextPage) return;

    this.pagination.currentPage++;
    await this.fetchResults();
  }
}

const InteractiveTable = observer(({ uiState, ...rest }) => {
  const { models, loading } = uiState;

  return (
    <React.Fragment>
      <Table models={models} loading={loading} onEndReached={() => uiState.nextPage()} {...rest}/>
    </React.Fragment>
  );
});

export default withState(InteractiveTable, InteractiveTableState);
