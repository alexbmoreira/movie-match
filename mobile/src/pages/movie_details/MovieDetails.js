import { ScreenContainer, Text } from 'components/common';
import { observer } from 'mobx-react';
import React from 'react';
import { withState } from 'shared';
import MovieDetailsState from './state/MovieDetailsState';

const MovieDetails = observer(({ uiState }) => {
  const { movie } = uiState;

  return (
    <ScreenContainer>
      <Text>{movie.title}</Text>
    </ScreenContainer>
  );
});

export default withState(MovieDetails, MovieDetailsState);
