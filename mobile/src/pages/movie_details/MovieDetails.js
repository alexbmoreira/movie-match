import { IconButton, Poster, ScreenContainer, Text, Title } from 'components/common';
import _ from 'lodash';
import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { withState } from 'shared';
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

const MovieDetails = observer(({ uiState }) => {
  const { movie } = uiState;

  return (
    <ScreenContainer scroll>
      <View style={style.headingDetails}>
        <Poster source={{ uri: movie.poster_link_md }} size='md' title={movie.title}/>
        <View style={style.info}>
          <View>
            <Title>{movie.title}</Title>
            <Text soft>{`${movie.release_year} • ${movie.runtimeHours}`}</Text>
            <View style={style.directorList}>
              <Text>Directed by</Text>
              {_.map(movie.directors, (director) => (
                <Text key={director.id} bold large>{director.name}</Text>
              ))}
            </View>
          </View>
          <IconButton
            icon={({ size, color }) => (
              <WatchlistIcon size={size} color={color} />
            )}
            onPress={() => console.log('pressed')}
          />
        </View>
      </View>
      <Text style={style.overview}>{movie.overview}</Text>
    </ScreenContainer>
  );
});

export default withState(MovieDetails, MovieDetailsState);
