import { InteractiveTable, UserListItem } from 'components/common';
import { observer } from 'mobx-react';
import React from 'react';
import { types, endpoints } from 'shared';
import { push } from 'shared/RootNavigation';
import { User } from 'stores';

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

const ProfileFriendsList = observer(({ route }) => {
  return (
    <InteractiveTable Model={User} endpoint={endpoints.USER.FRIENDS.with(route.params.userId)} type={types.USER} columns={COLUMNS} localization={LOCALIZATION}/>
  );
});

export default ProfileFriendsList;
