import { Text } from 'components/common';
import _ from 'lodash';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const style = StyleSheet.create({
  directorList: {
    marginTop: 10,
    marginBottom: 5
  },
});

const DirectorName = ({ name, isTruncated }) => {
  return (
    <Text bold large>{`${name}`}{isTruncated && <Text> ...</Text>}</Text>
  );
};

const DirectorList = ({ directors }) => {
  return (
    <View style={style.directorList}>
      <Text>Directed by:</Text>
      {_.map(_.slice(directors, 0, 2), (director, index) => {
        const isTruncated = index == 1 && _.size(directors) > 2;
        return (
          <DirectorName key={director.id} name={director.name} isTruncated={isTruncated}/>
        );
      })}
    </View>
  );
};

export default DirectorList;
