import { InteractiveTable } from 'components/common';
import { observer } from 'mobx-react';
import React from 'react';
import { View } from 'react-native';
import { types, endpoints } from 'shared';
import ResultItem from './ResultItem';
import { SearchResult } from 'stores';

const COLUMNS = [
  {
    component: ResultItem
  }
];

const LOCALIZATION = {
  emptyState: 'No results found'
};

const SCOPES = [
  {
    label: 'Movies', value: 'movies'
  },
  {
    label: 'People', value: 'people'
  },
  {
    label: 'Users', value: 'users'
  }
];

const SearchPage = observer(() => {

  return (
    <View>
      <InteractiveTable
        Model={SearchResult}
        endpoint={endpoints.SEARCH}
        type={types.SEARCH_RESULT}
        searchable
        showEmptyState={false}
        columns={COLUMNS}
        localization={LOCALIZATION}
        scopes={SCOPES}
      />
    </View>
  );
});

export default SearchPage;
