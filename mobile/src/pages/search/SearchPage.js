import { ScreenContainer, Table, TextInput } from 'components/common';
import { observer } from 'mobx-react';
import React from 'react';
import { withState } from 'shared';
import SearchState from './state/SearchState';

const RESULT_COLUMNS = [
  {
    attribute: 'title'
  }
];

const SearchPage = observer(({ uiState }) => {
  const { query, results } = uiState;
  return (
    <ScreenContainer scroll>
      <TextInput
        placeholder='Search for something...'
        value={query}
        onChange={value => uiState.updateQuery(value)}
        onSubmitEditing={uiState.search}
      />
      <Table models={results} columns={RESULT_COLUMNS}/>
    </ScreenContainer>
  );
});

export default withState(SearchPage, SearchState);
