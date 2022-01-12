import { ScreenContainer, Title } from 'components/common';
import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet } from 'react-native';
import { withState } from 'shared';
import MatchScreenState from './state/MatchScreenState';

const style = StyleSheet.create({
  registerRedirect: {
    display: 'flex',
    alignItems: 'center'
  }
});

const MatchScreen = observer(({ uiState, navigation }) => {
  const { jointWatchlist, friend, errors } = uiState;
  return (
    <ScreenContainer>
      <Title>Match Screen</Title>
    </ScreenContainer>
  );
});

export default withState(MatchScreen, MatchScreenState);
