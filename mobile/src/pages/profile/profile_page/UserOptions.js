import { Button, Title } from 'components/common';
import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet } from 'react-native';

const style= StyleSheet.create({
  title: {
    marginBottom: 15,
    textAlign: 'center'
  }
});

const UserOptions = observer(({ uiState }) => {
  const { user } = uiState;

  return (
    <React.Fragment>
      <Title style={style.title}>{user.username}</Title>
      {!user.is_friend && <Button mode='contained' onPress={() => uiState.sendFriendRequest()}>Send Friend Request</Button>}
    </React.Fragment>
  );
});

export default UserOptions;
