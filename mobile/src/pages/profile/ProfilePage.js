import { ScreenContainer } from '@components/common';
import { withState } from '@shared';
import _ from 'lodash';
import { observer } from 'mobx-react';
import React from 'react';
import { Text } from 'react-native-paper';
import ProfileState from './state/ProfileState';

const ProfilePage = observer(({ uiState }) => {
  const {profile} = uiState;

  return (
    <ScreenContainer scroll>
      <Text>{profile.user.username}</Text>
      {_.map(profile.friends, friend => (
        <Text key={friend.id}>{friend.username}</Text>
      ))}
      {_.map(profile.watchlist, movie => (
        <Text key={movie.id}>{movie.movie}</Text>
      ))}
    </ScreenContainer>
  );
})

export default withState(ProfilePage, ProfileState)
