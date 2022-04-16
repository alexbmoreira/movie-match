import Divider from 'components/common/Divider';
import _ from 'lodash';
import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Spinner from '../../Spinner';
import EmptyState from '../EmptyState';
import TableRow from './TableRow';

const _style = StyleSheet.create({
  flatList: {
    overflow: 'visible',
    height: '100%'
  },
  emptyState: {
    marginTop: 10,
    marginHorizontal: 10
  }
});

const Table = ({ models, columns, Header, localization, onEndReached, loading }) => {
  return (
    <View>
      <FlatList
        style={_style.flatList}
        data={models}
        renderItem={({ item }) => {
          return (
            <TableRow model={item} columns={columns}/>
          );
        }}
        keyExtractor={(_, index) => index.toString()}
        ItemSeparatorComponent={Divider}
        ListEmptyComponent={() => (
          <View style={_style.emptyState}>
            <EmptyState localization={localization}/>
          </View>
        )}
        ListHeaderComponent={Header}
        ListFooterComponent={() => !_.isEmpty(models) && 
          <View>
            <Divider offset={0}/>
            {loading && <Spinner/>}
          </View>}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

Table.defaultProps = {
  onEndReached: () => {},
  loading: false
};

export default observer(Table);
