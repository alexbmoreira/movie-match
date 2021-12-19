import React from 'react';
import { StyleSheet, View } from 'react-native';

const style = StyleSheet.create({
  cardListItem: {
    marginRight: 15
  }
});

const CardListItem = ({ model, component }) => {
  if(!component) return null;

  const Component = component;
  return (
    <View style={style.cardListItem}>
      <Component model={model}/>
    </View>
  );
};

export default CardListItem;
