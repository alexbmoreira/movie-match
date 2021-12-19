import { ScreenContainer, Table } from '@components/common';
import { withState } from '@shared';
import { observer } from 'mobx-react';
import React from 'react';
import AvatarHeader from './AvatarHeader';
import { FRIENDS_COLUMNS, MOVIE_COLUMNS } from './columns';
import ProfileState from './state/ProfileState';

const ProfilePage = observer(({ uiState }) => {
  const { profile } = uiState;

  return (
    <ScreenContainer scroll>
      <AvatarHeader user={profile.user}/>
      <Table title='Friends' models={profile.friends} columns={FRIENDS_COLUMNS}/>
      <Table title='Watchlist' models={profile.watchlist} columns={MOVIE_COLUMNS}/>
    </ScreenContainer>
  );
});

export default withState(ProfilePage, ProfileState);
