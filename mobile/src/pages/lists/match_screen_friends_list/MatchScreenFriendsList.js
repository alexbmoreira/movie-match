import { InteractiveTable, UserListItem } from 'components/common';
import { observer } from 'mobx-react';
import React from 'react';
import { endpoints } from 'shared';
import { push } from 'shared/RootNavigation';
import { User } from 'stores';

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

const MatchScreenFriendsList = observer(({ route }) => {
  return (
    <React.Fragment>
      <InteractiveTable Model={User} endpoint={endpoints.FRIENDS.with(route.params.userId)} columns={COLUMNS} localization={LOCALIZATION}/>
    </React.Fragment>
  );
});

export default MatchScreenFriendsList;
