import { TmdbListItem, UserListItem } from 'components/common';
import React from 'react';
import { push } from 'shared/RootNavigation';

const ResultItem = ({ model }) => {
  if(model.isMovie) {
    const { movie } = model;

    return (
      <TmdbListItem
        itemId={model.id.slice(2)}
        header={movie.title}
        imageLink={movie.posterThumb}
        item={movie}
        type={model.resultType}
      />
    );
  }

  if(model.isPerson) {
    const { person } = model;

    return (
      <TmdbListItem
        header={person.name}
        imageLink={person.profilePath}
        item={person}
        type={model.resultType}
      />
    );
  }

  if(model.isUser) {
    const { user } = model;

    return (
      <UserListItem
        user={user}
        onPress={() => push('OtherProfile', { userId: model.id.slice(2), username: user.username })}
      />
    );
  }
};

export default ResultItem;
