import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import UsernameWithAvatar from '../../UsernameWithAvatar';

const _style = StyleSheet.create({
  userListItem: {
    padding: 10
  }
});

const UserListItem = ({ user, onPress }) => {
  return (
    <TouchableHighlight onPress={onPress}>
      <View style={_style.userListItem}>
        <UsernameWithAvatar
          key={user.id}
          user={user}
          size='md'
        />
      </View>
    </TouchableHighlight>
  );
};

export default UserListItem;
