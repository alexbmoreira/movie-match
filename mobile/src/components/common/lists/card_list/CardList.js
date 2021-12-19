import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { List as ReactPaperList, Title } from 'react-native-paper';
import CardListItem from './CardListItem';

const CardList = ({ title, models, component }) => (
  <View>
    {title && <Title>{title}</Title>}
    <ReactPaperList.Section>
      <ScrollView
        horizontal 
        showsHorizontalScrollIndicator={false}
      >
        {models.map((model, index) => (
          <CardListItem key={index} model={model} component={component}/>
        ))}
      </ScrollView>
    </ReactPaperList.Section>
  </View>
);

export default CardList;
