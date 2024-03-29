import React from 'react';
import { MatchCutIcons } from 'shared/fonts';

const UserIcon = ({ size, color, ...rest }) => (
  <MatchCutIcons name={'user'} color={color} size={size} {...rest}/>
);

export default UserIcon;
