import { getRequest } from 'api';
import _ from 'lodash';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import { withState } from 'shared';
import Table from './Table';

class InteractiveTableState {
  endpoint;
  Model;
  models = observable([]);

  receiveProps({ Model, endpoint }) {
    this.Model = Model;
    this.endpoint = endpoint;
  }

  async load() {
    this.models = await getRequest(this.endpoint);
    this.models = _.map(this.models.results, model => new this.Model(model));
  }
}

const InteractiveTable = observer(({ uiState, ...rest }) => {
  const { models } = uiState;

  return (
    <Table models={models} {...rest}/>
  );
});

export default withState(InteractiveTable, InteractiveTableState);
