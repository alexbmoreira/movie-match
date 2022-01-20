import { Table, UserListItem } from 'components/common';
import { observer } from 'mobx-react';
import React from 'react';
import { withState } from 'shared';
import { push } from 'shared/RootNavigation';
import FriendsListState from './state/FriendsListState';

const Friend = ({ model }) => {
  return (
    <UserListItem
      user={model}
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
    <Table models={friends} columns={COLUMNS} localization={LOCALIZATION}/>
  );
});

export default withState(FriendsList, FriendsListState);
