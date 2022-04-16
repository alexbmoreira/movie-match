import React from 'react';
import { MatchCutIcons } from 'shared/fonts';

const MenuIcon = ({ size, color, ...rest }) => (
  <MatchCutIcons name={'ellipsis-h'} color={color} size={size} {...rest}/>
);

export default MenuIcon;
