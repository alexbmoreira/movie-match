import _ from 'lodash';
import React from 'react';
import { View } from 'react-native';
import { Text } from '../typography';

const MovieInfo = ({ item }) => {
  const { release_year, directors } = item;
  return (
    <View>
      <Text soft>{release_year}</Text>
      <Text>{`Directed by • ${_.map(directors, 'name').join(', ')}`}</Text>
    </View>
  );
};

export default MovieInfo;
