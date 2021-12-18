import { ScreenContainer } from '@components/common';
import { withState } from '@shared';
import _ from 'lodash';
import { observer } from 'mobx-react';
import React from 'react';
import { Text } from 'react-native-paper';
import ProfileState from './state/ProfileState';

const ProfilePage = observer(({ uiState }) => {
  const {profile} = uiState;
  console.log(profile.watchlist)

  return (
    <ScreenContainer>
      <Text>{profile.user.username}</Text>
      {_.map(profile.friends, friend => (
        <Text key={friend.id}>{friend.username}</Text>
      ))}
    </ScreenContainer>
  );
})

export default withState(ProfilePage, ProfileState)
