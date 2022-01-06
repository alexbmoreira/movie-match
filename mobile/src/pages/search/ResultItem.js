import { TmdbListItem, UsernameWithAvatar } from 'components/common';
import React from 'react';

const ResultItem = ({ model }) => {
  if(!model.type) {
    return (
      <UsernameWithAvatar
        user={model}
        size='md'
      />
    );
  }

  if(model.type === 'movie') {
    return (
      <TmdbListItem
        header={model.title}
        imageLink={model.poster_link_sm}
        item={model}
      />
    );
  }

  return (
    <TmdbListItem
      header={model.name}
      imageLink={model.profile_link_sm}
      item={model}
    />
  );
};

export default ResultItem;
