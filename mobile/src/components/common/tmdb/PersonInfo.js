import _ from 'lodash';
import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

const PersonInfo = ({ item }) => {
  const { known_for_department, known_for } = item;
  return (
    <View>
      <Text>{known_for_department}</Text>
      <View>
        <Text>Known for:</Text>
        {_.map(known_for.slice(0, 1), (movie) => (
          <Text key={movie.id}>{`- ${movie.title || movie.name}`}</Text>
        ))}
      </View>
    </View>
  );
};

export default PersonInfo;
