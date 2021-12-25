import { CardList, Spinner, Title } from 'components/common';
import { observer } from 'mobx-react';
import React from 'react';
import { View } from 'react-native';
import { withState } from 'shared';
import { Movie } from './ListComponents';
import WatchlistState from './state/WatchlistState';

const CustomSpinner = () => {
  return (
    <View>
      <Title>Watchlist</Title>
      <Spinner/>
    </View>
  );
};

const Watchlist = observer(({ uiState }) => {
  return (
    <CardList title='Watchlist' models={uiState.watchlist} component={Movie}/>
  );
});

export default withState(Watchlist, WatchlistState, { customSpinner: CustomSpinner });
