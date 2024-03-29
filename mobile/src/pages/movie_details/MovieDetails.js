import { Icon, IconButton, Poster, ScreenContainer, Text, Title } from 'components/common';
import _ from 'lodash';
import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { theme, withState } from 'shared';
import DirectorList from './DirectorList';
import MovieDetailsState from './state/MovieDetailsState';

const _style = StyleSheet.create({
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
  titleRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

const YearAndRuntime = ({ movie }) => {
  const year = movie.releaseYear || '';
  const delimiter = (movie.releaseYear && movie.runtimeHours) ? ' • ' : '';
  const runtime = movie.runtimeHours || '';
  return (
    <Text soft>{year}{delimiter}{runtime}</Text>
  );
};

const MovieDetails = observer(({ uiState }) => {
  const { movie, inWatchlist } = uiState;

  return (
    <ScreenContainer scroll>
      <View style={_style.headingDetails}>
        {movie.posterPath && <Poster style={_style.poster} source={{ uri: movie.posterPath }} size='md' title={movie.title}/>}
        <View style={_style.info}>
          <View>
            <View style={_style.titleRow}>
              <Title>{movie.title}</Title>
              <IconButton
                icon={({ size, color }) => (
                  <Icon name='add-to-watchlist' size={size} color={color} />
                )}
                onPress={() => uiState.editWatchlist()}
                color={inWatchlist ? theme.colors.primary : theme.colors.text}
                size={'sm'}
              />
            </View>
            <YearAndRuntime movie={movie}/>
            {!_.isEmpty(movie.directors) && <DirectorList directors={movie.directors}/>}
          </View>
        </View>
      </View>
      <Text style={_style.overview}>{movie.overview}</Text>
    </ScreenContainer>
  );
});

export default withState(MovieDetails, MovieDetailsState);
