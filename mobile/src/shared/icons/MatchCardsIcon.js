import React from 'react';
import { MatchCutIcons } from '../fonts';

const MatchCardsIcon = ({ size, color, ...rest }) => (
  <MatchCutIcons name={'match-cards'} color={color} size={size} {...rest}/>
);

export default MatchCardsIcon;
