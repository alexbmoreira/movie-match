import { Poster } from 'components/common/poster';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { navigate } from 'shared/RootNavigation';
import { TouchableHighlight } from '../../../gesture_handlers';
import { Text } from '../../../typography';
import MovieInfo from './MovieInfo';
import PersonInfo from './PersonInfo';

const _style = StyleSheet.create({
  resultItem: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  info: {
    flexGrow: 1,
    width: 0,
    marginLeft: 15,
    justifyContent: 'center'
  },
  detailedInfo: {
    marginTop: 5
  }
});

const TmdbListItem = ({ header, imageLink, item, type }) => {
  return (
    <TouchableHighlight onPress={() => type === 'movie' && navigate('MovieDetails', { movieId: item.id, title: item.title })}>
      <View style={_style.resultItem}>
        <Poster size='xs' title={header} source={{ uri: imageLink }}/>
        <View style={_style.info}>
          <Text large bold>{header}</Text>
          <View style={_style.detailedInfo}>
            {type === 'movie' ?
              <MovieInfo item={item}/> :
              <PersonInfo item={item}/>}
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default TmdbListItem;
