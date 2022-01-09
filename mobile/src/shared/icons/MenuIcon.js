import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';

const MenuIcon = ({ size, color, ...rest }) => (
  <FontAwesomeIcon icon={faEllipsisH} color={color} size={size} {...rest}/>
);

export default MenuIcon;
