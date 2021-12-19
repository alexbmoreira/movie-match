import { ScreenContainer, UsernameWithAvatar } from '@components/common';
import { withState } from '@shared';
import _ from 'lodash';
import { observer } from 'mobx-react';
import React from 'react';
import { Text, Title } from 'react-native-paper';
import AvatarHeader from './AvatarHeader';
import ProfileState from './state/ProfileState';

const ProfilePage = observer(({ uiState }) => {
  const { profile } = uiState;

  return (
    <ScreenContainer scroll>
      <AvatarHeader user={profile.user}/>
      <Title>Friends</Title>
      {_.map(profile.friends, friend => (
        <UsernameWithAvatar key={friend.id} user={friend} size='md'/>
      ))}
      <Title>Watchlist</Title>
      {_.map(profile.watchlist, movie => (
        <Text key={movie.id}>{movie.movie}</Text>
      ))}
    </ScreenContainer>
  );
});

export default withState(ProfilePage, ProfileState);
