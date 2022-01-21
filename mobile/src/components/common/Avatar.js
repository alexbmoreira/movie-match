import { PropTypes } from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { Avatar as Avi } from 'react-native-paper';
import { theme as defaultTheme } from 'shared';
var gravatarApi = require('gravatar-api');

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
  case 'xl':
    return 72;
  default:
    return 60;
  }
};

const theme = (avatar_color) => {
  return {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      primary: avatar_color,
    },
  };
};

const Avatar = ({ user, size, style }) => {
  const avatarSize = getAvatarSize(size);
  const gravatarOptions = {
    email: user.email,
    secure: true,
    parameters: { 'd': 'blank', 's': 200 }
  };
  const avatar = gravatarApi.imageUrl(gravatarOptions);

  if(avatar) {
    return (
      <View style={{ position: 'relative' }}>
        <Avi.Image style={[style, { zIndex: 10, position: 'absolute' }]} theme={{ colors: { primary:'transparent' } }} size={avatarSize} source={{ uri: avatar }} />
        <Avi.Text style={style} theme={theme(user.avatar_color)} size={avatarSize} label={user.userInitial} />
      </View>
    );
  }
};

Avatar.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl'])
};

export default Avatar;
