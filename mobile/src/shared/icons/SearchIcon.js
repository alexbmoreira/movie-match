import React from 'react';
import { MatchCutIcons } from '../fonts';

const SearchIcon = ({ size, color, ...rest }) => (
  <MatchCutIcons name={'search'} color={color} size={size} {...rest}/>
);

export default SearchIcon;
