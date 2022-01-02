import _ from 'lodash';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { List as ReactPaperList } from 'react-native-paper';
import { Title } from '../../typography';
import EmptyState from '../EmptyState';
import CardListItem from './CardListItem';

const style = StyleSheet.create({
  scrollView: {
    overflow: 'visible'
  },
  cardListItem: {
    marginRight: 15
  },
  cardListItemLast: {
    marginRight: 0
  },
  title: {
    marginBottom: 10
  }
});

const ListSection = ({ models, component }) => {
  return (
    <ReactPaperList.Section>
      <ScrollView
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={style.scrollView}
      >
        {_.map(models, (model, index) => (
          <View key={index} style={[style.cardListItem, (index === models.length - 1 && style.cardListItemLast)]}>
            <CardListItem model={model} component={component}/>
          </View>
        ))}
      </ScrollView>
    </ReactPaperList.Section>
  );
};

const CardList = ({ title, models, component }) => {
  return (
    <View>
      {title && <Title style={style.title}>{title}</Title>}
      {_.isEmpty(models) ?
        <EmptyState/> :
        <ListSection models={models} component={component}/>}
    </View>
  );
};

export default CardList;
