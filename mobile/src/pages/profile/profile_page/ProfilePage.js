import { BottomSheet, ScreenContainer } from 'components/common';
import { observer } from 'mobx-react';
import React from 'react';
import { withState } from 'shared';
import AvatarHeader from './AvatarHeader';
import Friends from './Friends';
import ProfileState from './state/ProfileState';
import UserOptions from './UserOptions';
import Watchlist from './Watchlist';

const ProfilePage = observer(({ uiState }) => {
  const { user, friends, watchlist, bottomSheetRef } = uiState;

  return (
    <React.Fragment>
      <ScreenContainer scroll>
        <ScreenContainer.Stack>
          <AvatarHeader user={user}/>
          <Watchlist watchlist={watchlist}/>
          <Friends friends={friends}/>
        </ScreenContainer.Stack>
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
