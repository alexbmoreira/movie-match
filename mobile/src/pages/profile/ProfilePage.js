import { ScreenContainer } from '@components/common';
import { withState } from '@shared';
import _ from 'lodash';
import { observer } from 'mobx-react';
import React from 'react';
import { Text, Title } from 'react-native-paper';
import ProfileState from './state/ProfileState';

const ProfilePage = observer(({ route, uiState }) => {
  const { userId } = route.params;
  const { profile } = uiState;

  return (
    <ScreenContainer scroll>
      <Title>{profile.user.username}</Title>
      <Title>Friends</Title>
      {_.map(profile.friends, friend => (
        <Text key={friend.id}>{friend.username}</Text>
      ))}
      <Title>Watchlist</Title>
      {_.map(profile.watchlist, movie => (
        <Text key={movie.id}>{movie.movie}</Text>
      ))}
    </ScreenContainer>
  );
})

export default withState(ProfilePage, ProfileState)
