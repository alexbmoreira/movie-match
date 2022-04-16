import React from 'react';
import DislikeIcon from './DislikeIcon';
import LikeIcon from './LikeIcon';
import MatchCardsIcon from './MatchCardsIcon';
import MenuIcon from './MenuIcon';
import SearchIcon from './SearchIcon';
import SettingsIcon from './SettingsIcon';
import UserIcon from './UserIcon';
import WatchlistIcon from './WatchlistIcon';

const IconFactory = ({ name, size, color }) => {
  switch (name) {
  case 'dislike':
    return <DislikeIcon size={size} color={color}/>;
  case 'like':
    return <LikeIcon size={size} color={color}/>;
  case 'match-cards':
    return <MatchCardsIcon size={size} color={color}/>;
  case 'menu':
    return <MenuIcon size={size} color={color}/>;
  case 'search':
    return <SearchIcon size={size} color={color}/>;
  case 'settings':
    return <SettingsIcon size={size} color={color}/>;
  case 'user':
    return <UserIcon size={size} color={color}/>;
  case 'add-to-watchlist':
    return <WatchlistIcon size={size} color={color}/>;
  default:
    throw new Error(`Icon ${name} is not supported.`);
  }
};

export default IconFactory;
