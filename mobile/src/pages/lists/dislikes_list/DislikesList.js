import { InteractiveTable, TmdbListItem } from 'components/common';
import { types, endpoints } from 'shared';
import { observer } from 'mobx-react';
import React from 'react';
import { MatchlistAction } from 'stores';

const Movie = ({ model }) => {
  const { movie } = model;

  return (
    <TmdbListItem
      header={movie.title}
      imageLink={movie.posterThumb}
      item={movie}
      type={'movie'}
    />
  );
};

const COLUMNS = [
  {
    component: Movie
  }
];

const LOCALIZATION = {
  emptyState: 'You haven\'t disliked any movies yet'
};

const DislikesList = observer(({ route }) => {
  const { friendId } = route.params;

  return (
    <InteractiveTable
      Model={MatchlistAction}
      endpoint={endpoints.MATCHLIST_DISLIKES.WITH_USER.with(friendId)}
      type={types.MATCHLIST_ACTION}
      columns={COLUMNS}
      localization={LOCALIZATION}
    />
  );
});

export default DislikesList;
