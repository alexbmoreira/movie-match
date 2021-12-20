import { Poster, UsernameWithAvatar } from 'components/common';
import React from 'react';

const Friend = ({ model }) => {
  return (
    <UsernameWithAvatar key={model.id} user={model} size='md'/>
  );
};

const Movie = ({ model }) => {
  return (
    <Poster size='sm' title={model.title} source={{ uri: model.poster_link_sm }}/>
  );
};

export {
  Friend,
  Movie
};
