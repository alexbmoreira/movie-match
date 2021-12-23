import { Poster, UsernameWithAvatar } from 'components/common';
import React from 'react';
import { Pressable } from 'react-native';
import { navigate } from 'shared/RootNavigation';

const Friend = ({ model }) => {
  return (
    <UsernameWithAvatar key={model.id} user={model} size='md'/>
  );
};

const Movie = ({ model }) => {
  return (
    <Pressable onPress={() => navigate('MovieDetails', { movieId: model.id })}>
      <Poster size='sm' title={model.title} source={{ uri: model.poster_link_sm }}/>
    </Pressable>
  );
};

export {
  Friend,
  Movie
};
