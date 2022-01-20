import { PropTypes } from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Avatar from './Avatar';
import { Title } from './typography';

const _style = StyleSheet.create({
  usernameWithAvatar: {
    display: 'flex',
    flexDirection: 'row'
  },
  avatar: {
    marginRight: 15
  },
  username: {
    alignSelf: 'center'
  }
});

const UsernameWithAvatar = ({ user, size }) => {
  return (
    <View style={_style.usernameWithAvatar}>
      <Avatar style={_style.avatar} size={size} user={user} />
      <Title style={_style.username}>{user.username}</Title>
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
