import { Button, Text, Title } from 'components/common';
import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const style= StyleSheet.create({
  title: {
    marginBottom: 15,
    textAlign: 'center'
  },
  receivingFriendRequestButtonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  friendRequestSubHeader: {
    textAlign: 'center',
    marginBottom: 10
  },
  receiveingFriendRequestButtons: {
    width: '47.5%'
  }
});

const FriendButton = observer(({ uiState }) => {
  const { user } = uiState;

  if(uiState.userIsAFriend) {
    return (
      <Button mode='contained' onPress={() => uiState.removeFriend()}>{`Unfriend ${user.username}`}</Button>
    );
  }
  if(uiState.userRequested) {
    return (
      <View>
        <Text large style={style.friendRequestSubHeader}>Friend Request Sent!</Text>
        <Button mode='contained' onPress={() => uiState.deleteFriendRequest()}>Cancel</Button>
      </View>
    );
  }
  if(uiState.userRequesting) {
    return (
      <View>
        <Text large style={style.friendRequestSubHeader}>{`${user.username} wants to be your friend!`}</Text>
        <View style={style.receivingFriendRequestButtonsContainer}>
          <Button style={style.receiveingFriendRequestButtons} mode='contained' onPress={() => uiState.acceptFriendRequest()}>Accept</Button>
          <Button style={style.receiveingFriendRequestButtons} mode='contained' onPress={() => uiState.deleteFriendRequest()}>Decline</Button>
        </View>
      </View>
    );
  }
  if(!uiState.isCurrentUser) {
    return (
      <Button mode='contained' onPress={() => uiState.sendFriendRequest()}>Send a Friend Request</Button>
    );
  }

  return null;
});

const UserOptions = observer(({ uiState }) => {
  const { user } = uiState;

  return (
    <React.Fragment>
      <Title style={style.title}>{user.username}</Title>
      <FriendButton uiState={uiState}/>
    </React.Fragment>
  );
});

export default UserOptions;
