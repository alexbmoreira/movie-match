import { UsernameWithAvatar } from '@components/common';
import React from 'react';
import { Text } from 'react-native-paper';

const Friend = ({ model }) => {
  return (
    <UsernameWithAvatar key={model.id} user={model} size='md'/>
  );
};

const Movie = ({ model }) => {
  return (
    <Text>{model.movie}</Text>
  );
};

export {
  Friend,
  Movie
};
