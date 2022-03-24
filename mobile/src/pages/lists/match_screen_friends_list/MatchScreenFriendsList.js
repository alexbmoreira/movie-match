import { InteractiveTable, UserListItem } from 'components/common';
import { observer } from 'mobx-react';
import React from 'react';
import { endpoints, withState } from 'shared';
import { push } from 'shared/RootNavigation';
import { User } from 'stores';
import MatchScreenFriendsListState from './state/MatchScreenFriendsListState';

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
  // const { friends } = uiState;

  return (
    <React.Fragment>
      {/* <Table models={friends} Model={User} endpoint={endpoints.FRIENDS.with(route.params.userId)} columns={COLUMNS} localization={LOCALIZATION}/> */}
      <InteractiveTable Model={User} endpoint={endpoints.FRIENDS.with(route.params.userId)} columns={COLUMNS} localization={LOCALIZATION}/>
    </React.Fragment>
  );
});

export default withState(MatchScreenFriendsList, MatchScreenFriendsListState);
