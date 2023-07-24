import { InteractiveTable, UserListItem } from 'components/common';
import { observer } from 'mobx-react';
import React from 'react';
import { endpoints, types } from 'shared';
import { push } from 'shared/RootNavigation';
import { User } from 'stores';
import { authStore } from 'shared/stores';

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

const MatchScreenFriendsList = observer(() => {
  return (
    <React.Fragment>
      <InteractiveTable Model={User} endpoint={endpoints.USER.FRIENDS.with(authStore.user.id)} type={types.USER} columns={COLUMNS} localization={LOCALIZATION}/>
    </React.Fragment>
  );
});

export default MatchScreenFriendsList;
