import _ from 'lodash';
import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

const MovieInfo = ({ item }) => {
  const { release_year, directors } = item;
  return (
    <View>
      <Text>{release_year}</Text>
      <Text>{`Directed by • ${_.map(directors, 'name').join(', ')}`}</Text>
    </View>
  );
};

export default MovieInfo;
