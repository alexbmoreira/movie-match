import { Avatar, Headline } from 'components/common';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const style = StyleSheet.create({
  avatarHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const AvatarHeader = ({ user }) => {
  return (
    <View style={style.avatarHeader}>
      <Avatar user={user} size={'lg'}/>
      <Headline>{user.username}</Headline>
    </View>
  );
};

export default AvatarHeader;
