import { BottomSheet, ScreenContainer, Table } from 'components/common';
import { observer } from 'mobx-react';
import React from 'react';
import { withState } from 'shared';
import AvatarHeader from './AvatarHeader';
import { FRIENDS_COLUMNS } from './columns';
import ProfileState from './state/ProfileState';
import UserOptions from './UserOptions';
import Watchlist from './Watchlist';

const ProfilePage = observer(({ uiState }) => {
  const { user, bottomSheetRef } = uiState;

  return (
    <React.Fragment>
      <ScreenContainer scroll>
        <AvatarHeader user={user}/>
        <Watchlist watchlist={user.watchlist}/>
        <Table title='Friends' models={user.friends} columns={FRIENDS_COLUMNS}/>
      </ScreenContainer>
      {!uiState.isCurrentUser &&
        <BottomSheet
          innerRef={bottomSheetRef}
          snapPoints={[150, 0]}
        >
          <UserOptions uiState={uiState}/>
        </BottomSheet>}
    </React.Fragment>
  );
});

export default withState(ProfilePage, ProfileState);
