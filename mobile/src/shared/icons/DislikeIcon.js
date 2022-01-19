import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';

const DislikeIcon = ({ size, color, ...rest }) => (
  <FontAwesomeIcon
    icon={faThumbsDown}
    color={color}
    size={size}
    {...rest} 
  />
);

export default DislikeIcon;
