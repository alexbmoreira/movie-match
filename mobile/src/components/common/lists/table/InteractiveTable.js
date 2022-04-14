import { getRequest } from 'api';
import _ from 'lodash';
import { action, makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import { Url, withState } from 'shared';
import Table from './Table';

class InteractiveTableState {
  endpoint;
  Model;

  models = [];
  pagination = {
    currentPage: 1,
    nextPage: null,
    previousPage: null,
    totalPages: 1,
    totalCount: 0
  };

  constructor() {
    makeObservable(this, {
      models: observable,
      pagination: observable,
      load: action.bound,
      fetchResults: action.bound,
      updateModels: action.bound,
      nextPage: action.bound
    });
  }

  receiveProps({ Model, endpoint }) {
    this.Model = Model;
    this.endpoint = endpoint;
  }

  async load() {
    await this.fetchResults();
  }

  async fetchResults() {
    const response = await getRequest(this.constructUrl(this.endpoint, this.pagination));
    this.updateModels(_.map(response.results, model => new this.Model(model)));

    this.pagination.currentPage = response.current;
    this.pagination.nextPage = response.next;
    this.pagination.previousPage = response.previous;
  }

  updateModels(data) {
    if (!this.models.length) {
      this.models = data;
    } else {
      this.models = this.models.concat(data);
    }
  }

  constructUrl(endpoint, pagination) {
    const url = new Url(endpoint);

    this.__addPaginationParams(url, pagination);
  
    return url.toString();
  }

  __addPaginationParams(url, pagination) {
    url.params['page'] = pagination.currentPage;
  }

  async nextPage() {
    if (!this.pagination.nextPage) return;

    this.pagination.currentPage++;
    await this.fetchResults();
  }
}

const InteractiveTable = observer(({ uiState, ...rest }) => {
  const { models } = uiState;

  return (
    <Table models={models} onEndReached={() => uiState.nextPage()} {...rest}/>
  );
});

export default withState(InteractiveTable, InteractiveTableState);
