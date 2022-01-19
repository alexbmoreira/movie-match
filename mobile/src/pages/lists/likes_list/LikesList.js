import { ScreenContainer, Table, TmdbListItem } from 'components/common';
import { observer } from 'mobx-react';
import React from 'react';
import { withState } from 'shared';
import LikesListState from './state/LikesListState';

const Movie = ({ model }) => {
  return (
    <TmdbListItem
      header={model.title}
      imageLink={model.poster_link_sm}
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
    <ScreenContainer>
      <Table models={likes} columns={COLUMNS} localization={LOCALIZATION}/>
    </ScreenContainer>
  );
});

export default withState(LikesList, LikesListState);
