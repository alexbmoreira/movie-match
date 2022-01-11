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
    <ScreenContainer scroll>
      <SearchBar uiState={uiState}/>
      {isLoading ? <Spinner/> : <Table models={results} columns={COLUMNS} localization={LOCALIZATION}/>}
    </ScreenContainer>
  );
});

export default withState(SearchPage, SearchState);
