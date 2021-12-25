import { Poster } from 'components/common/poster';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { navigate } from 'shared/RootNavigation';
import { Title } from '../typography';
import MovieInfo from './MovieInfo';
import PersonInfo from './PersonInfo';

const style = StyleSheet.create({
  resultItem: {
    display: 'flex',
    flexDirection: 'row'
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

const TmdbListItem = ({ header, imageLink, item }) => {
  return (
    <Pressable onPress={() => item.type === 'movie' && navigate('MovieDetails', { movieId: item.id })}>
      <View style={style.resultItem}>
        <Poster size='sm' title={header} source={{ uri: imageLink }}/>
        <View style={style.info}>
          <Title>{header}</Title>
          <View style={style.detailedInfo}>
            {item.type === 'movie' ?
              <MovieInfo item={item}/> :
              <PersonInfo item={item}/>}
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default TmdbListItem;
