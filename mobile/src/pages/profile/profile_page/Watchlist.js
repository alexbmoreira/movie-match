import { CardList, Poster, Spinner, Title } from 'components/common';
import { observer } from 'mobx-react';
import React from 'react';
import { Pressable, View } from 'react-native';
import { withState } from 'shared';
import { navigate } from 'shared/RootNavigation';
import WatchlistState from './state/WatchlistState';

const CustomSpinner = () => {
  return (
    <View>
      <Title>Watchlist</Title>
      <Spinner/>
    </View>
  );
};

const Movie = ({ model }) => {
  return (
    <Pressable onPress={() => navigate('MovieDetails', { movieId: model.id, title: model.title })}>
      <Poster size='sm' title={model.title} source={{ uri: model.poster_link_sm }}/>
    </Pressable>
  );
};

const LOCALIZATION = {
  emptyState: 'Watchlist is empty'
};

const Watchlist = observer(({ uiState }) => {
  return (
    <CardList title='Watchlist' models={uiState.watchlist} component={Movie} localization={LOCALIZATION}/>
  );
});

export default withState(Watchlist, WatchlistState, { customSpinner: CustomSpinner });
