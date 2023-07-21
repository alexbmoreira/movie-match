import { Text } from 'components/common';
import _ from 'lodash';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const _style = StyleSheet.create({
  directorList: {
    marginTop: 10
  },
});

const DirectorName = ({ name, isTruncated }) => {
  return (
    <Text bold>{`${name}`}{isTruncated && <Text> ...</Text>}</Text>
  );
};

const DirectorList = ({ directors }) => {
  return (
    <View style={_style.directorList}>
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
