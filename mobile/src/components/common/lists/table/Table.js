import Divider from 'components/common/Divider';
import _ from 'lodash';
import React from 'react';
import { View } from 'react-native';
import { List as ReactPaperList } from 'react-native-paper';
import { Title } from '../../typography';
import TableRow from './TableRow';

const Table = ({ title, models, columns }) => (
  <View>
    {title && <Title>{title}</Title>}
    <ReactPaperList.Section>
      {_.map(models, (model, index) => (
        <View key={index}>
          {index > 0 && <Divider/>}
          <TableRow model={model} columns={columns}/>
        </View>
      ))}
    </ReactPaperList.Section>
  </View>
);

export default Table;
