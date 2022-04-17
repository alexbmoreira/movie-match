import React from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from 'shared';
import TableCell from './TableCell';

const _style = StyleSheet.create({
  tableRow: {
    backgroundColor: theme.colors.screen,
  }
});

const TableRow = ({ model, columns, style }) => {
  return (
    <View style={[_style.tableRow, style]}>
      {columns.map((column, index) => (
        <TableCell key={index} model={model} column={column}/>
      ))}
    </View>
  );
};

export default TableRow;
