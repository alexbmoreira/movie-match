import { BottomSheet, Button, ScreenContainer, Table, Title } from 'components/common';
import { observer } from 'mobx-react';
import React from 'react';
import { withState } from 'shared';
import AvatarHeader from './AvatarHeader';
import { FRIENDS_COLUMNS } from './columns';
import ProfileState from './state/ProfileState';
import Watchlist from './Watchlist';

const ProfilePage = observer(({ uiState }) => {
  const { user, userOptionsSheetOpen } = uiState;

  return (
    <React.Fragment>
      <ScreenContainer scroll>
        <AvatarHeader user={user}/>
        <Watchlist watchlist={user.watchlist}/>
        <Table title='Friends' models={user.friends} columns={FRIENDS_COLUMNS}/>
      </ScreenContainer>
      <BottomSheet
        title={user.username}
        visible={userOptionsSheetOpen}
        onDismiss={() => uiState.closeUserOptionsSheet()}
      >
        <Title></Title>
        <Button onPress={() => console.log('send request')}>Send Friend Request</Button>
      </BottomSheet>
    </React.Fragment>
  );
});

export default withState(ProfilePage, ProfileState);
