import React from 'react';
import { MatchCutIcons } from '../fonts';

const LikeIcon = ({ size, color, ...rest }) => (
  <MatchCutIcons name={'thumbs-up'} color={color} size={size} {...rest}/>
);

export default LikeIcon;
