import { Poster } from 'components/common/poster';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { navigate } from 'shared/RootNavigation';
import { Title } from '../../../typography';
import MovieInfo from './MovieInfo';
import PersonInfo from './PersonInfo';

const _style = StyleSheet.create({
  resultItem: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10
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
        <Poster size='sm' title={header} source={{ uri: imageLink }}/>
        <View style={_style.info}>
          <Title>{header}</Title>
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
