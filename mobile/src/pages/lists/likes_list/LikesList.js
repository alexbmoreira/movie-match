import { Table, TmdbListItem } from 'components/common';
import { observer } from 'mobx-react';
import React from 'react';
import { withState } from 'shared';
import LikesListState from './state/LikesListState';

const Movie = ({ model }) => {
  return (
    <TmdbListItem
      header={model.title}
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
  emptyState: 'You haven\'t liked any movies yet'
};

const LikesList = observer(({ uiState }) => {
  const { likes } = uiState;
  return (
    <Table models={likes} columns={COLUMNS} localization={LOCALIZATION}/>
  );
});

export default withState(LikesList, LikesListState);
