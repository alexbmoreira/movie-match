import { Table, UserListItem } from 'components/common';
import { observer } from 'mobx-react';
import React from 'react';
import { withState } from 'shared';
import { push } from 'shared/RootNavigation';
import ProfileFriendsListState from './state/ProfileFriendsListState';

const Friend = ({ model }) => {
  return (
    <UserListItem
      user={model}
      onPress={() => push('OtherProfile', { userId: model.id, username: model.username })}
    />
  );
};

const COLUMNS = [
  {
    component: Friend
  }
];

const LOCALIZATION = {
  emptyState: 'This user has no friends'
};

const ProfileFriendsList = observer(({ uiState }) => {
  const { friends } = uiState;
  return (
    <Table models={friends} columns={COLUMNS} localization={LOCALIZATION}/>
  );
});

export default withState(ProfileFriendsList, ProfileFriendsListState);
