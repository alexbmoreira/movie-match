import { TextListItem, BottomSheet, Divider, Table } from 'components/common';
import { observer } from 'mobx-react';
import React from 'react';
import { View } from 'react-native';
import { withState } from 'shared';
import AvatarHeader from './AvatarHeader';
import ProfileState from './state/ProfileState';
import UserOptions from './UserOptions';
import Watchlist from './Watchlist';

const AvatarAndWatchlist = observer(({ uiState }) => {
  const { user, watchlist } = uiState;

  return (
    <View style={{ paddingTop: 20 }}>
      <AvatarHeader user={user}/>
      <Watchlist user={user} watchlist={watchlist}/>
      <Divider offset={0}/>
    </View>
  );
});

const ProfilePage = observer(({ uiState }) => {
  const { profileListPages, bottomSheetRef } = uiState;

  return (
    <View>
      <Table
        Header={() => <AvatarAndWatchlist uiState={uiState}/>}
        models={profileListPages}
        columns={[{ component: TextListItem }]}
      />
      {!uiState.isCurrentUser &&
        <BottomSheet
          index={-1}
          innerRef={bottomSheetRef}
          snapPoint={150}
        >
          <UserOptions uiState={uiState}/>
        </BottomSheet>}
    </View>
  );
});

export default withState(ProfilePage, ProfileState);
