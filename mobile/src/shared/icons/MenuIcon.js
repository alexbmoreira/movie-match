import React from 'react';
import { MatchCutIcons } from '../fonts';

const MenuIcon = ({ size, color, ...rest }) => (
  <MatchCutIcons name={'ellipsis-h'} color={color} size={size} {...rest}/>
);

export default MenuIcon;
