import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

const ResultItem = ({ model }) => {
  if(model.type === 'movie') {
    return (
      <View>
        <Text>{model.title}</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>{model.name}</Text>
    </View>
  );
};

export default ResultItem;
