import { CardList } from 'components/common';
import { observer } from 'mobx-react';
import React from 'react';
import { withState } from 'shared';
import { Movie } from './ListComponents';
import WatchlistState from './state/WatchlistState';

const Watchlist = observer(({ uiState }) => {
  return (
    <CardList title='Watchlist' models={uiState.watchlist} component={Movie}/>
  );
});

export default withState(Watchlist, WatchlistState);
