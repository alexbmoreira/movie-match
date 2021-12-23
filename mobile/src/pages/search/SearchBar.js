import { FormLayout, Select, TextInput } from 'components/common';
import { observer } from 'mobx-react';
import React from 'react';

const SEARCH_TYPE_OPTIONS = [
  {
    label: 'Movies', value: 'movies'
  },
  {
    label: 'Actors', value: 'actors'
  },
  {
    label: 'Crew', value: 'crew'
  }
];

const SearchBar = observer(({ uiState }) => {
  const { query, type } = uiState;
  return (
    <FormLayout>
      <TextInput
        placeholder='Search for something...'
        value={query}
        onChange={value => uiState.updateQuery(value)}
        onSubmitEditing={uiState.search}
      />
      <Select
        onValueChange={(value) => uiState.updateType(value)}
        onDonePress={uiState.search}
        items={SEARCH_TYPE_OPTIONS}
        value={type}
      />
    </FormLayout>
  );
});

export default SearchBar;
