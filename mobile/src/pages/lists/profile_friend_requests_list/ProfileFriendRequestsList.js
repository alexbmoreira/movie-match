import { InteractiveTable, UserListItem } from 'components/common';
import { observer } from 'mobx-react';
import React from 'react';
import { endpoints } from 'shared';
import { push } from 'shared/RootNavigation';
import { FriendRequest } from 'stores';

const User = ({ model }) => {
  const { creator } = model;
  return (
    <UserListItem
      user={creator}
      onPress={() => push('OtherProfile', { userId: creator.id, username: creator.username })}
    />
  );
};

const COLUMNS = [
  {
    component: User
  }
];

const LOCALIZATION = {
  emptyState: 'You have no incoming friend requests'
};

const ProfileFriendRequestsList = observer(() => {
  return (
    <InteractiveTable
      Model={FriendRequest}
      endpoint={endpoints.FRIEND_REQUESTS.INCOMING}
      columns={COLUMNS}
      localization={LOCALIZATION}
    />
  );
});

export default ProfileFriendRequestsList;
