import React from 'react';
import { View } from 'react-native';
import { List as ReactPaperList, Title } from 'react-native-paper';
import TableRow from './TableRow';

const Table = ({ title, models, columns }) => (
  <View>
    {title && <Title>{title}</Title>}
    <ReactPaperList.Section>
      {models.map((model, index) => (
        <TableRow key={index} model={model} columns={columns}/>
      ))}
    </ReactPaperList.Section>
  </View>
);

export default Table;
