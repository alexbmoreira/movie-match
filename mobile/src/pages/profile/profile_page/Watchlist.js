import { CardList, Poster, Text, Title, TouchableHighlight } from 'components/common';
import { observer } from 'mobx-react';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { navigate, push } from 'shared/RootNavigation';

const _style = StyleSheet.create({
  watchlist: {
    paddingHorizontal: 15,
    paddingBottom: 10,
  }
});

const Movie = ({ model }) => {
  const { movie } = model;

  return (
    <Pressable onPress={() => navigate('MovieDetails', { movieId: movie.id, title: movie.title })}>
      <Poster size='sm' title={movie.title} source={{ uri: movie.poster_link_sm }}/>
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

const Watchlist = observer(({ user, watchlist }) => {
  return (
    <TouchableHighlight style={_style.watchlist} onPress={() => push('Watchlist', { userId: user.id })}>
      <CardList title={WatchlistTitle} models={watchlist} component={Movie} localization={LOCALIZATION}/>
    </TouchableHighlight>
  );
});

export default Watchlist;
