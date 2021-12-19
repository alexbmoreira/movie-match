import React from 'react';
import { StyleSheet, View } from 'react-native';
import TableCell from './TableCell';

const style = StyleSheet.create({
  tableRow: {
    paddingVertical: '2%'
  }
});

const TableRow = ({ model, columns }) => {
  return (
    <View style={style.tableRow}>
      {columns.map((column, index) => (
        <TableCell key={index} model={model} column={column}/>
      ))}
    </View>
  );
};

export default TableRow;
