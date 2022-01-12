import { ScreenContainer, Table, UsernameWithAvatar } from 'components/common';
import { observer } from 'mobx-react';
import React from 'react';
import { withState } from 'shared';
import { push } from 'shared/RootNavigation';
import FriendsListState from './state/FriendsListState';

const Friend = ({ model }) => {
  return (
    <UsernameWithAvatar
      key={model.id}
      user={model}
      size='md'
      onPress={() => push('MatchScreen', { friendId: model.id })}
    />
  );
};

const COLUMNS = [
  {
    component: Friend
  }
];

const LOCALIZATION = {
  emptyState: 'You have no friends'
};

const FriendsList = observer(({ uiState }) => {
  const { friends } = uiState;
  return (
    <ScreenContainer scroll>
      <Table title='Friends' models={friends} columns={COLUMNS} localization={LOCALIZATION}/>
    </ScreenContainer>
  );
});

export default withState(FriendsList, FriendsListState);