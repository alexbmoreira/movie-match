import { getRequest } from 'api';
import _ from 'lodash';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import { Url, withState } from 'shared';
import Table from './Table';

class InteractiveTableState {
  endpoint;
  Model;
  models = observable([]);
  pagination = observable({
    currentPage: 1,
    nextPage: null,
    previousPage: null,
    totalPages: 1,
    totalCount: 0
  });

  receiveProps({ Model, endpoint }) {
    this.Model = Model;
    this.endpoint = endpoint;
  }

  async load() {
    await this.fetchResults();
  }

  async fetchResults() {
    const response = await getRequest(this.constructUrl(this.endpoint, this.pagination));
    this.models = _.map(response.results, model => new this.Model(model));

    this.pagination.currentPage = response.current;
    this.pagination.nextPage = response.next;
    this.pagination.previousPage = response.previous;
  }

  constructUrl(endpoint, pagination) {
    const url = new Url(endpoint);

    this.__addPaginationParams(url, pagination);
  
    return url.toString();
  }

  __addPaginationParams(url, pagination) {
    url.params['page'] = pagination.currentPage;
  }
}

const InteractiveTable = observer(({ uiState, ...rest }) => {
  const { models } = uiState;

  return (
    <Table models={models} {...rest}/>
  );
});

export default withState(InteractiveTable, InteractiveTableState);
