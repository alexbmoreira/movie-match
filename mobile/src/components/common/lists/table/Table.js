import Divider from 'components/common/Divider';
import _ from 'lodash';
import React from 'react';
import { View } from 'react-native';
import { List as ReactPaperList } from 'react-native-paper';
import { Title } from '../../typography';
import EmptyState from '../EmptyState';
import TableRow from './TableRow';

const ListSection = ({ models, columns }) => {
  return (
    <ReactPaperList.Section>
      {_.map(models, (model, index) => (
        <View key={index}>
          {index > 0 && <Divider/>}
          <TableRow model={model} columns={columns}/>
        </View>
      ))}
    </ReactPaperList.Section>
  );
};

const Table = ({ title, models, columns }) => {
  return (
    <View>
      {title && <Title>{title}</Title>}
      {_.isEmpty(models) ?
        <EmptyState/> :
        <ListSection models={models} columns={columns}/>}
    </View>
  );
};

export default Table;
