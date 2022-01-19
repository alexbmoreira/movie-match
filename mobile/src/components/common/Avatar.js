import { PropTypes } from 'prop-types';
import React from 'react';
import { Avatar as Avi } from 'react-native-paper';
import { theme as defaultTheme } from 'shared';

const getAvatarSize = (size) => {
  switch (size) {
  case 'xs':
    return 24;
  case 'sm':
    return 36;
  case 'md':
    return 48;
  case 'lg':
    return 60;
  default:
    return 60;
  }
};

const theme = (avatar_color) => {
  return{
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      primary: avatar_color,
    },
  };
};

const Avatar = ({ user, size, style }) => {
  const avatarSize = getAvatarSize(size);

  return (
    <Avi.Text style={style} theme={theme(user.avatar_color)} size={avatarSize} label={user.userInitial} />
  );
};

Avatar.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg'])
};

export default Avatar;
