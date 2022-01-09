import { Button, Text, Title } from 'components/common';
import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const style= StyleSheet.create({
  title: {
    marginBottom: 15,
    textAlign: 'center'
  },
  receivingRequestButtonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  receivingRequestSubHeader: {
    textAlign: 'center',
    marginBottom: 10
  },
  receivingRequestButtons: {
    width: '47.5%'
  }
});

const FriendButton = ({ uiState }) => {
  const { user } = uiState;
  if(uiState.userIsAFriend) {
    return (
      <Button mode='contained' onPress={() => uiState.removeFriend()}>{`Unfriend ${user.username}`}</Button>
    );
  }
  if(uiState.userRequesting) {
    return (
      <Button disabled mode='contained' onPress={() => {}}>Friend Request Sent!</Button>
    );
  }
  if(uiState.userRequested) {
    return (
      <View>
        <Text large style={style.receivingRequestSubHeader}>{`${user.username} wants to be your friend!`}</Text>
        <View style={style.receivingRequestButtonsContainer}>
          <Button style={style.receivingRequestButtons} mode='contained' onPress={() => uiState.acceptFriendRequest()}>Accept</Button>
          <Button style={style.receivingRequestButtons} mode='contained' onPress={() => uiState.declineFriendRequest()}>Decline</Button>
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
};

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
