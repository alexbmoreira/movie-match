import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableHighlight } from '../../gesture_handlers';
import UsernameWithAvatar from '../../UsernameWithAvatar';

const _style = StyleSheet.create({
  userListItem: {
    paddingVertical: 10,
    paddingHorizontal: 15
  }
});

const UserListItem = ({ user, onPress }) => {
  return (
    <TouchableHighlight onPress={onPress}>
      <View style={_style.userListItem}>
        <UsernameWithAvatar
          user={user}
          size='md'
        />
      </View>
    </TouchableHighlight>
  );
};

export default UserListItem;
