import React from 'react';
import { MatchCutIcons } from 'shared/fonts';

const WatchlistIcon = ({ size, color, ...rest }) => (
  <MatchCutIcons name={'add-to-watchlist'} color={color} size={size} {...rest}/>
);

export default WatchlistIcon;
