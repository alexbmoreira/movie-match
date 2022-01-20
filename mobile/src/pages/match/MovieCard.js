import { Headline, Text, TouchableOpacity } from 'components/common';
import { LinearGradient } from 'expo-linear-gradient';
import { observer } from 'mobx-react';
import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { theme } from 'shared';
import { navigate } from 'shared/RootNavigation';

const _style = StyleSheet.create({
  movieCard: {
    flex: 1,
    borderRadius: theme.roundness
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    borderRadius: theme.roundness
  },
  details: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 80,
    borderRadius: theme.roundness
  }
});

const MovieCard = observer(({ movie }) => {
  return (
    <View style={_style.movieCard}>
      <ImageBackground
        source={{ uri: movie.poster_link_og }}
        resizeMode="cover"
        style={_style.image} 
        imageStyle={{ borderRadius: theme.roundness }}
      >
        <LinearGradient colors={[(theme.colors.backdrop + '00'), (theme.colors.backdrop + 'FF')]} style={_style.details}>
          <TouchableOpacity
            onPress={() => navigate('MovieDetails', { movieId: movie.id, title: movie.title })}
          >
            <Headline bold>{movie.title}</Headline>
            <Text>{movie.release_year}</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
});

export default MovieCard;
