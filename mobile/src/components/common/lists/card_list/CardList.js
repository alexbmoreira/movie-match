import _ from 'lodash';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { List as ReactPaperList } from 'react-native-paper';
import { Title } from '../../typography';
import EmptyState from '../EmptyState';
import CardListItem from './CardListItem';

const _style = StyleSheet.create({
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
        style={_style.scrollView}
      >
        {_.map(models, (model, index) => (
          <View key={index} style={[_style.cardListItem, (index === models.length - 1 && _style.cardListItemLast)]}>
            <CardListItem model={model} component={component}/>
          </View>
        ))}
      </ScrollView>
    </ReactPaperList.Section>
  );
};

const ListTitle = ({ title }) => {
  if(_.isString(title)) {
    return (
      <Title>{title}</Title>
    );
  }

  const TitleComponent = title;

  return <TitleComponent/>;
};

const CardList = ({ title, models, component, localization }) => {
  return (
    <View>
      {title && <ListTitle title={title}/>}
      {_.isEmpty(models) ?
        <View style={_style.emptyState}><EmptyState localization={localization}/></View> :
        <ListSection models={models} component={component}/>}
    </View>
  );
};

export default CardList;
