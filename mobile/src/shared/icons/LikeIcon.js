import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';

const LikeIcon = ({ size, color, ...rest }) => (
  <FontAwesomeIcon icon={faThumbsUp} color={color} size={size} {...rest}/>
);

export default LikeIcon;
