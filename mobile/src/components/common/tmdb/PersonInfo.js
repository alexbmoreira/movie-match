import _ from 'lodash';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../typography';

const _style = StyleSheet.create({
  department: {
    marginBottom: 5
  }
});

const PersonInfo = ({ item }) => {
  const { known_for_department, known_for } = item;
  return (
    <View>
      <Text soft style={_style.department}>{known_for_department}</Text>
      <View>
        {!_.isEmpty(known_for) && <Text>Known for:</Text>}
        {_.map(known_for.slice(0, 1), (movie) => (
          <Text bold key={movie.id}>{`${movie.title || movie.name}`}</Text>
        ))}
      </View>
    </View>
  );
};

export default PersonInfo;
