import _ from 'lodash';
import React from 'react';
import { View } from 'react-native';
import { Text } from '../typography';

const DirectorList = ({ directors }) => {
  const listedDirectors = _.map(_.slice(directors, 0, 2), 'name').join(', ');
  return (
    <Text bold>{`${listedDirectors}${_.size(directors) > 2 ? ', ...' : ''}`}</Text>
  );
};

const MovieInfo = ({ item }) => {
  const { release_year, directors } = item;
  return (
    <View>
      <Text soft>{release_year}</Text>
      <Text>Directed by • <DirectorList directors={directors}/></Text>
    </View>
  );
};

export default MovieInfo;
