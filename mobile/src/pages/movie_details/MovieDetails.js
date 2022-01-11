import { IconButton, Poster, ScreenContainer, Text, Title } from 'components/common';
import _ from 'lodash';
import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { theme, withState } from 'shared';
import { WatchlistIcon } from 'shared/icons';
import DirectorList from './DirectorList';
import MovieDetailsState from './state/MovieDetailsState';

const style = StyleSheet.create({
  headingDetails: {
    display: 'flex',
    flexDirection: 'row'
  },
  info: {
    flexGrow: 1,
    width: 0,
    justifyContent: 'space-between'
  },
  overview: {
    marginTop: 15
  },
  poster: {
    marginRight: 15
  },
  iconRow: {
    marginTop: 15
  }
});

const YearAndRuntime = ({ movie }) => {
  const year = movie.release_year || '';
  const delimiter = (movie.release_year && movie.runtimeHours) ? ' • ' : '';
  const runtime = movie.runtimeHours || '';
  return (
    <Text soft>{year}{delimiter}{runtime}</Text>
  );
};

const MovieDetails = observer(({ uiState }) => {
  const { movie, in_watchlist } = uiState;

  return (
    <ScreenContainer scroll>
      <View style={style.headingDetails}>
        {movie.poster_link_md && <Poster style={style.poster} source={{ uri: movie.poster_link_md }} size='md' title={movie.title}/>}
        <View style={style.info}>
          <View>
            <Title>{movie.title}</Title>
            <YearAndRuntime movie={movie}/>
            {!_.isEmpty(movie.directors) && <DirectorList directors={movie.directors}/>}
          </View>
        </View>
      </View>
      <View style={style.iconRow}>
        <IconButton
          icon={({ size, color }) => (
            <WatchlistIcon size={size} color={color} />
          )}
          onPress={() => uiState.addToWatchlist(in_watchlist)}
          color={in_watchlist ? theme.colors.primary : theme.colors.text}
          size={'sm'}
        />
      </View>
      <Text style={style.overview}>{movie.overview}</Text>
    </ScreenContainer>
  );
});

export default withState(MovieDetails, MovieDetailsState);
