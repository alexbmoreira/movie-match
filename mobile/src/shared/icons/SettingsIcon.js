import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';

const SearchIcon = ({ size, color, ...rest }) => (
  <FontAwesomeIcon icon={faCog} color={color} size={size} {...rest}/>
);

export default SearchIcon;
