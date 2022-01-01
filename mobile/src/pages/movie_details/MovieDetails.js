import { IconButton, Poster, ScreenContainer, Text, Title } from 'components/common';
import _ from 'lodash';
import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { theme, withState } from 'shared';
import { WatchlistIcon } from 'shared/icons';
import MovieDetailsState from './state/MovieDetailsState';

const style = StyleSheet.create({
  headingDetails: {
    display: 'flex',
    flexDirection: 'row'
  },
  info: {
    flexGrow: 1,
    width: 0,
    marginLeft: 15,
    justifyContent: 'space-between'
  },
  directorList: {
    marginTop: 10
  },
  overview: {
    marginTop: 15
  }
});

const YearAndRuntime = ({ year, runtime }) => {
  if(runtime) {
    return (
      <Text soft>{`${year} • ${runtime}`}</Text>
    );
  }
  
  return (
    <Text soft>{year}</Text>
  );
};

const MovieDetails = observer(({ uiState }) => {
  const { movie, in_watchlist } = uiState;

  return (
    <ScreenContainer scroll>
      <View style={style.headingDetails}>
        <Poster source={{ uri: movie.poster_link_md }} size='md' title={movie.title}/>
        <View style={style.info}>
          <View>
            <Title>{movie.title}</Title>
            <YearAndRuntime year={movie.release_year} runtime={movie.runtimeHours}/>
            <View style={style.directorList}>
              <Text>Directed by:</Text>
              {_.map(movie.directors, (director) => (
                <Text key={director.id} bold large>{director.name}</Text>
              ))}
            </View>
          </View>
          <IconButton
            icon={({ size, color }) => (
              <WatchlistIcon size={size} color={color} />
            )}
            onPress={() => uiState.addToWatchlist(in_watchlist)}
            color={in_watchlist ? theme.colors.primary : theme.colors.text}
          />
        </View>
      </View>
      <Text style={style.overview}>{movie.overview}</Text>
    </ScreenContainer>
  );
});

export default withState(MovieDetails, MovieDetailsState);
