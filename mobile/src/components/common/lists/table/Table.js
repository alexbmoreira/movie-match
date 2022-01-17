import Divider from 'components/common/Divider';
import _ from 'lodash';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import EmptyState from '../EmptyState';
import TableRow from './TableRow';

const _style = StyleSheet.create({
  flatList: {
    overflow: 'visible',
    height: '100%' 
  },
  tableRow: {
    marginVertical: 10
  },
  tableRowFirst: {
    marginTop: 0,
    marginBottom: 10
  },
  tableRowLast: {
    marginTop: 10,
    marginBottom: 0
  },
  emptyState: {
    marginTop: 10
  }
});

const getActiveRowStyle = (index, size) => {
  switch (index) {
  case 0:
    return _style.tableRowFirst;
  case (size - 1):
    return _style.tableRowLast;
  default:
    return _style.tableRow;
  }
};

const Table = ({ models, columns, Header, localization }) => {
  return (
    <View>
      <FlatList
        style={_style.flatList}
        data={models}
        renderItem={({ item, index }) => {
          const activeRowStyle = getActiveRowStyle(index, _.size(models));
          return (
            <View key={index}>
              <TableRow model={item} columns={columns} style={activeRowStyle}/>
            </View>
          );
        }}
        ItemSeparatorComponent={Divider}
        ListEmptyComponent={() => <View style={_style.emptyState}><EmptyState localization={localization}/></View>}
        ListHeaderComponent={Header}
      />
    </View>
  );
};

export default Table;
