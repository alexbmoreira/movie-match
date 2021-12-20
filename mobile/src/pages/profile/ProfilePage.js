import { ScreenContainer, Table } from 'components/common';
import { observer } from 'mobx-react';
import React from 'react';
import { withState } from 'shared';
import AvatarHeader from './AvatarHeader';
import { FRIENDS_COLUMNS } from './columns';
import ProfileState from './state/ProfileState';
import Watchlist from './Watchlist';

const ProfilePage = observer(({ uiState }) => {
  const { profile } = uiState;

  return (
    <ScreenContainer scroll>
      <AvatarHeader user={profile.user}/>
      <Watchlist watchlist={profile.watchlist}/>
      <Table title='Friends' models={profile.friends} columns={FRIENDS_COLUMNS}/>
    </ScreenContainer>
  );
});

export default withState(ProfilePage, ProfileState);
