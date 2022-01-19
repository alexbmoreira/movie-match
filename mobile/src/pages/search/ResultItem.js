import { TmdbListItem, UsernameWithAvatar } from 'components/common';
import React from 'react';
import { push } from 'shared/RootNavigation';

const ResultItem = ({ model }) => {
  if(!model.type) {
    return (
      <UsernameWithAvatar
        user={model}
        size='md'
        onPress={() => push('OtherProfile', { userId: model.id, username: model.username })}
      />
    );
  }

  if(model.type === 'movie') {
    return (
      <TmdbListItem
        header={model.title}
        imageLink={model.poster_link_sm}
        item={model}
        type={model.type}
      />
    );
  }

  return (
    <TmdbListItem
      header={model.name}
      imageLink={model.profile_link_sm}
      item={model}
      type={model.type}
    />
  );
};

export default ResultItem;
