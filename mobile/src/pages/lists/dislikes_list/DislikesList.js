import { Table, TmdbListItem } from 'components/common';
import { observer } from 'mobx-react';
import React from 'react';
import { View } from 'react-native';
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
    <View style={{ marginTop: 10 }}>
      <Table models={dislikes} columns={COLUMNS} localization={LOCALIZATION}/>
    </View>
  );
});

export default withState(DislikesList, DislikesListState);
