import { ScreenContainer, Spinner, Table } from 'components/common';
import { observer } from 'mobx-react';
import React from 'react';
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
    <ScreenContainer>
      {isLoading ? <Spinner/> : <Table Header={() => (<SearchBar uiState={uiState}/>)} models={results} columns={COLUMNS} localization={LOCALIZATION}/>}
    </ScreenContainer>
  );
});

export default withState(SearchPage, SearchState);
