import FormLayout from '../../forms/FormLayout';
import Select from '../../Select';
import TextInput from '../../TextInput';
import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const _style = StyleSheet.create({
  searchBar: {
    paddingHorizontal: 10,
    paddingTop: 15
  }
});

const SearchBar = observer(({ uiState, scopes }) => {
  const { filter } = uiState;

  return (
    <View style={_style.searchBar}>
      <FormLayout>
        <TextInput
          placeholder='Search for something...'
          value={filter.query}
          onChange={value => uiState.updateFilter({ query: value })}
          onSubmitEditing={() => uiState.refresh()}
        />
        {scopes &&
          <Select
            onValueChange={(value) => uiState.updateFilter({ scope: value })}
            onDonePress={() => uiState.refresh()}
            items={scopes}
            value={filter.scope}
          />
        }
      </FormLayout>
    </View>
  );
});

export default SearchBar;
