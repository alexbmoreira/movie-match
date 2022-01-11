import React from 'react';
import { View } from 'react-native';
import TableCell from './TableCell';

const TableRow = ({ model, columns, style }) => {
  return (
    <View style={style}>
      {columns.map((column, index) => (
        <TableCell key={index} model={model} column={column}/>
      ))}
    </View>
  );
};

export default TableRow;
