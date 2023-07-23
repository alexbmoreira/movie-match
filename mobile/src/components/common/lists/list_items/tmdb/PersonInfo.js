// import _ from  'lodash';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../../../typography';

const _style = StyleSheet.create({
  department: {
    marginBottom: 5
  }
});

const PersonInfo = ({ item }) => {
  const { knownForDepartment } = item;

  return (
    <View>
      <Text soft style={_style.department}>{knownForDepartment}</Text>
      <View>
        {/* {!_.isEmpty(knownFor) && <Text>Known for:</Text>}
        {_.map(knownFor.slice(0, 1), (movie) => (
          (movie.title || movie.name)<Text bold key={movie.id}>{`${movie.title || movie.name}`}</Text>
        ))} */}
      </View>
    </View>
  );
};

export default PersonInfo;
