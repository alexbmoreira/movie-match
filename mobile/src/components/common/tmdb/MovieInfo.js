import _ from 'lodash';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../typography';

const style = StyleSheet.create({
  releaseYear: {
    marginBottom: 5
  }
});

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
      {!!release_year && <Text soft style={style.releaseYear}>{release_year}</Text>}
      {!_.isEmpty(directors) && <Text>Directed by • <DirectorList directors={directors}/></Text>}
    </View>
  );
};

export default MovieInfo;
