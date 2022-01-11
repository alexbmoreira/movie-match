import { Table, UsernameWithAvatar } from 'components/common';
import React from 'react';

const Friend = ({ model }) => {
  return (
    <UsernameWithAvatar key={model.id} user={model} size='md'/>
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
