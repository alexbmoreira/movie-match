import { RefreshControl } from 'react-native';
import { observer } from 'mobx-react';
import React from 'react';
import { withState } from 'shared';
import Table from './Table';
import SearchBar from './SearchBar';
import InteractiveTableState from './state/InteractiveTableState';

const InteractiveTable = observer(({ uiState, searchable, showEmptyState, scopes, ...rest }) => {
  const { models, loading, refreshing } = uiState;

  return (
    <React.Fragment>
      <Table
        Header={() => searchable && <SearchBar uiState={uiState} scopes={scopes}/>}
        models={models}
        loading={loading}
        refreshing={refreshing}
        showEmptyState={showEmptyState}
        onEndReached={() => uiState.nextPage()}
        refreshControl={
          <RefreshControl
            onRefresh={uiState.refresh}
          />
        }
        {...rest}
      />
    </React.Fragment>
  );
});

InteractiveTable.defaultProps = {
  showEmptyState: true,
  searchable: false
};

export default withState(InteractiveTable, InteractiveTableState);
