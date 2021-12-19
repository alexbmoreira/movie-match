import { CardList, ScreenContainer, Table } from 'components/common';
import { observer } from 'mobx-react';
import React from 'react';
import { withState } from 'shared';
import AvatarHeader from './AvatarHeader';
import { FRIENDS_COLUMNS } from './columns';
import { Movie } from './ListComponents';
import ProfileState from './state/ProfileState';

const ProfilePage = observer(({ uiState }) => {
  const { profile } = uiState;

  return (
    <ScreenContainer scroll>
      <AvatarHeader user={profile.user}/>
      <Table title='Friends' models={profile.friends} columns={FRIENDS_COLUMNS}/>
      <CardList title='Watchlist' models={profile.watchlist} component={Movie}/>
    </ScreenContainer>
  );
});

export default withState(ProfilePage, ProfileState);
