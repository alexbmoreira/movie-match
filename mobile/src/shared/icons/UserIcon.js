import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';

const UserIcon = ({ size, color, ...rest }) => (
  <FontAwesomeIcon icon={faUser} color={color} size={size} {...rest}/>
);

export default UserIcon;
