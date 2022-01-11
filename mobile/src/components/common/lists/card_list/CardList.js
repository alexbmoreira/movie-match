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
  emptyState: {
    marginTop: 10
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

const CardList = ({ title, models, component, localization }) => {
  return (
    <View>
      {title && <Title>{title}</Title>}
      {_.isEmpty(models) ?
        <View style={style.emptyState}><EmptyState localization={localization}/></View> :
        <ListSection models={models} component={component}/>}
    </View>
  );
};

export default CardList;
