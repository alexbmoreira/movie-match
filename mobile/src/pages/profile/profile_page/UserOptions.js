import { Button, Text, Title } from 'components/common';
import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const _style= StyleSheet.create({
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

  console.log(uiState.friendship);
  if(uiState.isFriend) {
    return (
      <Button mode='contained' onPress={() => uiState.unfriend()}>{`Unfriend ${user.username}`}</Button>
    );
  }
  if(uiState.hasReceivedFriendRequest) {
    return (
      <View>
        <Text large style={_style.friendRequestSubHeader}>Friend Request Sent!</Text>
        <Button mode='contained' onPress={() => uiState.deleteFriendRequest()}>Cancel</Button>
      </View>
    );
  }
  if(uiState.isRequestingFriendship) {
    return (
      <View>
        <Text large style={_style.friendRequestSubHeader}>{`${user.username} wants to be your friend!`}</Text>
        <View style={_style.receivingFriendRequestButtonsContainer}>
          <Button style={_style.receiveingFriendRequestButtons} mode='contained' onPress={() => uiState.acceptFriendRequest()}>Accept</Button>
          <Button style={_style.receiveingFriendRequestButtons} mode='contained' onPress={() => uiState.deleteFriendRequest()}>Decline</Button>
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
      <Title style={_style.title}>{user.username}</Title>
      <FriendButton uiState={uiState}/>
    </React.Fragment>
  );
});

export default UserOptions;
