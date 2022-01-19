import { Avatar } from 'components/common';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const _style = StyleSheet.create({
  avatarHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const AvatarHeader = ({ user }) => {
  return (
    <View style={_style.avatarHeader}>
      <Avatar user={user} size={'xl'}/>
    </View>
  );
};

export default AvatarHeader;
