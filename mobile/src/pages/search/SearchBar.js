import { FormLayout, Select, TextInput } from 'components/common';
import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const SEARCH_TYPE_OPTIONS = [
  {
    label: 'Movies', value: 'movies'
  },
  {
    label: 'Actors', value: 'actors'
  },
  {
    label: 'Crew', value: 'crew'
  },
  {
    label: 'Users', value: 'users'
  }
];

const _style = StyleSheet.create({
  searchBar: {
    paddingHorizontal: 10,
    paddingTop: 15
  }
});

const SearchBar = observer(({ uiState }) => {
  const { query, type } = uiState;
  return (
    <View style={_style.searchBar}>
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
    </View>
  );
});

export default SearchBar;
