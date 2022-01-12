import { ScreenContainer, Text, Title } from 'components/common';
import _ from 'lodash';
import { observer } from 'mobx-react';
import React from 'react';
import { withState } from 'shared';
import MatchScreenState from './state/MatchScreenState';

const MatchScreen = observer(({ uiState }) => {
  const { jointWatchlist } = uiState;
  return (
    <ScreenContainer scroll>
      <Title>Match Screen</Title>
      {_.map(jointWatchlist, movie => {
        return <Text key={movie.id}>{movie.movie}</Text>;
      })}
    </ScreenContainer>
  );
});

export default withState(MatchScreen, MatchScreenState);
