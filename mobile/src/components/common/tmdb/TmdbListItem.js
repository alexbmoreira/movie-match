import { Poster } from 'components/common/poster';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { navigate } from 'shared/RootNavigation';
import { Title } from '../typography';
import MovieInfo from './MovieInfo';
import PersonInfo from './PersonInfo';

const _style = StyleSheet.create({
  resultItem: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 10
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
    <Pressable onPress={() => type === 'movie' && navigate('MovieDetails', { movieId: item.id, title: item.title })}>
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
    </Pressable>
  );
};

export default TmdbListItem;
