import { PropTypes } from 'prop-types';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { theme } from 'shared';
import Avatar from './Avatar';
import { Text } from './typography';

const getUserCardWidth = (size) => {
  switch (size) {
  case 'sm':
    return {
      width: 92
    };
  case 'md':
    return {
      width: 122
    };
  case 'lg':
  default:
    return {
      width: 500
    };
  }
};

const _style = StyleSheet.create((size) => {
  const { width } = getUserCardWidth(size);
  return {
    userCard: {
      display: 'flex',
      alignItems: 'center',
      width: width,
      backgroundColor: theme.colors.backdrop,
      borderRadius: theme.roundness,
      padding: 10
    },
    avatar: {
      marginBottom: 10
    }
  };
});

const UserCard = ({ user, size, onPress }) => {
  const style = _style(size);
  return (
    <Pressable onPress={() => onPress()}>
      <View style={style.userCard}>
        <Avatar style={style.avatar} size={size} user={user} />
        <Text numberOfLines={1}>{user.username}</Text>
      </View>
    </Pressable>
  );
};

UserCard.defaultProps = {
  size: 'md'
};

UserCard.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg'])
};

export default UserCard;
