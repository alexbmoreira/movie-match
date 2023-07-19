import { InteractiveTable, TmdbListItem } from 'components/common';
import { observer } from 'mobx-react';
import React from 'react';
import { withState, endpoints, types } from 'shared';
import WatchlistState from './state/WatchlistState';
import { WatchlistMovie } from 'stores';

const Movie = ({ model }) => {
  const { movie } = model;

  console.log(movie);
  return (
    <TmdbListItem
      header={movie.title}
      imageLink={movie.posterThumb}
      item={movie}
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
  const { userId } = uiState;

  return (
    <InteractiveTable
      Model={WatchlistMovie}
      endpoint={endpoints.USER.WATCHLIST.with(userId)}
      type={types.WATCHLIST_MOVIE}
      columns={COLUMNS}
      localization={LOCALIZATION}
    />
  );
});

export default withState(Watchlist, WatchlistState);
