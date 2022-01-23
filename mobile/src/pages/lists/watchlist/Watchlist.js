import { Table, TmdbListItem } from 'components/common';
import { observer } from 'mobx-react';
import React from 'react';
import { withState } from 'shared';
import WatchlistState from './state/WatchlistState';

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
  emptyState: 'Watchlist is empty'
};

const Watchlist = observer(({ uiState }) => {
  const { watchlistMovies } = uiState;
  return (
    <Table models={watchlistMovies} columns={COLUMNS} localization={LOCALIZATION}/>
  );
});

export default withState(Watchlist, WatchlistState);
