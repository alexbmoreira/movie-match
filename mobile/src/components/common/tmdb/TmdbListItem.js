import { Poster } from 'components/common/poster';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Title } from 'react-native-paper';
import { navigate } from 'shared/RootNavigation';
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
  }
});

const TmdbListItem = ({ header, imageLink, item }) => {
  return (
    <Pressable onPress={() => navigate('MovieDetails', { movieId: item.id })}>
      <View style={style.resultItem}>
        <Poster size='sm' title={header} source={{ uri: imageLink }}/>
        <View style={style.info}>
          <Title>{header}</Title>
          {item.type === 'movie' ?
            <MovieInfo item={item}/> :
            <PersonInfo item={item}/>}
        </View>
      </View>
    </Pressable>
  );
};

export default TmdbListItem;
