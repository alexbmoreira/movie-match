import { PropTypes } from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Avatar from './Avatar';
import { Text } from './typography';

const _style = StyleSheet.create({
  usernameWithAvatar: {
    display: 'flex',
    flexDirection: 'row'
  },
  avatar: {
    marginRight: 10
  },
  username: {
    alignSelf: 'center'
  }
});

const UsernameWithAvatar = ({ user, size }) => {
  return (
    <View style={_style.usernameWithAvatar}>
      <Avatar style={_style.avatar} size={size} user={user} />
      <Text large bold style={_style.username}>{user.username}</Text>
    </View>
  );
};

UsernameWithAvatar.defaultProps = {
  size: 'md'
};

UsernameWithAvatar.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg'])
};

export default UsernameWithAvatar;
