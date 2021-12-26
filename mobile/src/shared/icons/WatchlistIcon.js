import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';

const WatchlistIcon = ({ size, color, ...rest }) => (
  <FontAwesomeIcon icon={faClock} color={color} size={size} {...rest}/>
);

export default WatchlistIcon;
