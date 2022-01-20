import { Table, TmdbListItem } from 'components/common';
import { observer } from 'mobx-react';
import React from 'react';
import { withState } from 'shared';
import MatchlistState from './state/MatchlistState';

const Movie = ({ model }) => {
  return (
    <TmdbListItem
      header={model.title}
      imageLink={model.poster_link_sm}
      item={model}
      type={'movie'}
    />
  );
};

const COLUMNS = [
  {
    component: Movie
  }
];

const LOCALIZATION = {
  emptyState: 'You haven\'t matched on any movies yet'
};

const Matchlist = observer(({ uiState }) => {
  const { matches } = uiState;
  return (
    <Table models={matches} columns={COLUMNS} localization={LOCALIZATION}/>
  );
});

export default withState(Matchlist, MatchlistState);
