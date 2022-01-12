import { Table, UsernameWithAvatar } from 'components/common';
import React from 'react';
import { push } from 'shared/RootNavigation';

const Friend = ({ model }) => {
  return (
    <UsernameWithAvatar
      key={model.id}
      user={model}
      size='md'
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

const Friends = ({ friends }) => {
  return (
    <Table title='Friends' models={friends} columns={COLUMNS} localization={LOCALIZATION}/>
  );
};

export default Friends;
