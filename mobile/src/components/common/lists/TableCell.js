import _ from 'lodash';
import React from 'react';
import { Text } from 'react-native-paper';

const TableCell = ({ model, column }) => {
  if(column.attribute) {
    const value = _.get(model, column.attribute);

    return <Text>{value}</Text>;
  }

  if(column.component) {
    const Component = column.component;
    return <Component model={model}/>;
  }
};

export default TableCell;
