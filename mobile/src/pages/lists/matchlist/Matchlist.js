import { InteractiveTable, TmdbListItem } from 'components/common';
import { types, endpoints } from 'shared';
import { observer } from 'mobx-react';
import React from 'react';
import { TmdbMovie } from 'stores';

const Movie = ({ model }) => {
  return (
    <TmdbListItem
      header={model.title}
      itemId={model.id}
      imageLink={model.posterPath}
      item={model}
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
  emptyState: 'You haven\'t matched on any movies yet'
};

const Matchlist = observer(({ route }) => {
  const { friendId } = route.params;

  return (
    <InteractiveTable
      Model={TmdbMovie}
      endpoint={endpoints.USER.MATCHLIST.with(friendId)}
      type={types.TMDB.MOVIE}
      columns={COLUMNS}
      localization={LOCALIZATION}
    />
  );
});

export default Matchlist;
