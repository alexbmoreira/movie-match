import { Spinner, Table } from 'components/common';
import { observer } from 'mobx-react';
import React from 'react';
import { View } from 'react-native';
import { withState } from 'shared';
import ResultItem from './ResultItem';
import SearchBar from './SearchBar';
import SearchState from './state/SearchState';

const COLUMNS = [
  {
    component: ResultItem
  }
];

const LOCALIZATION = {
  emptyState: 'No results found'
};

const SearchPage = observer(({ uiState }) => {
  const { results, isLoading } = uiState;

  return (
    <View>
      {isLoading ?
        <Spinner/> :
        <Table
          Header={() => (<SearchBar uiState={uiState}/>)}
          models={results}
          columns={COLUMNS}
          localization={LOCALIZATION}
        />}
    </View>
  );
});

export default withState(SearchPage, SearchState);
