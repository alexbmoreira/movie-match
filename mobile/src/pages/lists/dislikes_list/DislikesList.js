import { ScreenContainer, Table, TmdbListItem } from 'components/common';
import { observer } from 'mobx-react';
import React from 'react';
import { withState } from 'shared';
import DislikesListState from './state/DislikesListState';

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
  emptyState: 'You haven\'t disliked any movies yet'
};

const DislikesList = observer(({ uiState }) => {
  const { dislikes } = uiState;
  return (
    <ScreenContainer>
      <Table models={dislikes} columns={COLUMNS} localization={LOCALIZATION}/>
    </ScreenContainer>
  );
});

export default withState(DislikesList, DislikesListState);
