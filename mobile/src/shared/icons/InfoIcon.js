import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';

const InfoIcon = ({ size, color, ...rest }) => (
  <FontAwesomeIcon icon={faInfoCircle} color={color} size={size} {...rest}/>
);

export default InfoIcon;
