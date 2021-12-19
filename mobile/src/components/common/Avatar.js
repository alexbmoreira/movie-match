import { PropTypes } from 'prop-types';
import React from 'react';
import { Avatar as Avi } from 'react-native-paper';

const getAvatarSize = (size) => {
  switch (size) {
  case 'xs':
    return 24;
  case 'sm':
    return 36;
  case 'md':
    return 48;
  case 'lg':
    return 64;
  default:
    return 64;
  }
};

const Avatar = ({user, size, style}) => {
  const avatarSize = getAvatarSize(size);
  return (
    <Avi.Text style={style} size={avatarSize} label={user.userInitial} />
  );
};

Avatar.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg'])
};

export default Avatar;
