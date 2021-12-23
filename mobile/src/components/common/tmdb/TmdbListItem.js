import { Poster } from 'components/common/poster';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Title } from 'react-native-paper';
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
    <View style={style.resultItem}>
      <Poster size='sm' title={header} source={{ uri: imageLink }}/>
      <View style={style.info}>
        <Title>{header}</Title>
        {item.type === 'movie' ?
          <MovieInfo item={item}/> :
          <PersonInfo item={item}/>}
      </View>
    </View>
  );
};

export default TmdbListItem;
