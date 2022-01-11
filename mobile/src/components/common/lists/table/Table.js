import Divider from 'components/common/Divider';
import _ from 'lodash';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { List as ReactPaperList } from 'react-native-paper';
import { Title } from '../../typography';
import EmptyState from '../EmptyState';
import TableRow from './TableRow';

const style = StyleSheet.create({
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
  }
});

const getActiveRowStyle = (index, size) => {
  switch (index) {
  case 0:
    return style.tableRowFirst;
  case (size - 1):
    return style.tableRowLast;
  default:
    return style.tableRow;
  }
};

const ListSection = ({ models, columns }) => {
  return (
    <ReactPaperList.Section>
      {_.map(models, (model, index) => {
        const activeRowStyle = getActiveRowStyle(index, _.size(models));
        return (
          <View key={index}>
            {index > 0 && <Divider/>}
            <TableRow model={model} columns={columns} style={activeRowStyle}/>
          </View>
        );
      })}
    </ReactPaperList.Section>
  );
};

const Table = ({ title, models, columns, localization }) => {
  return (
    <View>
      {title && <Title>{title}</Title>}
      {_.isEmpty(models) ?
        <EmptyState localization={localization}/> :
        <ListSection models={models} columns={columns}/>}
    </View>
  );
};

export default Table;
