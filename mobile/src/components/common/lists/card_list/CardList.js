import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { List as ReactPaperList } from 'react-native-paper';
import { Title } from '../../typography';
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
  }
});

const CardList = ({ title, models, component }) => {
  return (
    <View>
      {title && <Title>{title}</Title>}
      <ReactPaperList.Section>
        <ScrollView
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={style.scrollView}
        >
          {models.map((model, index) => (
            <View key={index} style={[style.cardListItem, (index === models.length - 1 && style.cardListItemLast)]}>
              <CardListItem model={model} component={component}/>
            </View>
          ))}
        </ScrollView>
      </ReactPaperList.Section>
    </View>
  );
};

export default CardList;
