import { CardList, Poster, Spinner, Text, Title, TouchableHighlight } from 'components/common';
import { observer } from 'mobx-react';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { withState } from 'shared';
import { navigate } from 'shared/RootNavigation';
import WatchlistState from './state/WatchlistState';

const _style = StyleSheet.create({
  watchlist: {
    marginVertical: 20
  },
  watchlistTouchable: {
    paddingHorizontal: 15,
    paddingVertical: 0,
  }
});

const CustomSpinner = () => {
  return (
    <View style={[_style.watchlist, _style.watchlistTouchable]}>
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

const WatchlistTitle = () => {
  return (
    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <Title>Watchlist</Title>
      <Text soft small>{'See More >'}</Text>
    </View>
  );
};

const Watchlist = observer(({ uiState }) => {
  return (
    <View style={_style.watchlist}>
      <TouchableHighlight style={_style.watchlistTouchable} onPress={() => console.log('visit watchlist')}>
        <CardList title={WatchlistTitle} models={uiState.watchlist} component={Movie} localization={LOCALIZATION}/>
      </TouchableHighlight>
    </View>
  );
});

export default withState(Watchlist, WatchlistState, { customSpinner: CustomSpinner });
