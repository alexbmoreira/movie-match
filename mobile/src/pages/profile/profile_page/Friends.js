import { CardList, UserCard } from 'components/common';
import React from 'react';
import { push } from 'shared/RootNavigation';

const Friend = ({ model }) => {
  return (
    <UserCard
      key={model.id}
      user={model}
      size='md'
      onPress={() => push('OtherProfile', { userId: model.id, username: model.username })}
    />
  );
};

const LOCALIZATION = {
  emptyState: 'This user has no friends'
};

const Friends = ({ friends }) => {
  return (
    <CardList title='Friends' models={friends} component={Friend} localization={LOCALIZATION}/>
  );
};

export default Friends;
