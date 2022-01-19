import { Button, FormLayout, Title } from 'components/common';
import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet } from 'react-native';

const _style= StyleSheet.create({
  title: {
    marginBottom: 15,
    textAlign: 'center'
  }
});

const MatchActions = observer(({ uiState }) => {
  const { friend } = uiState;
  return (
    <FormLayout>
      <Button mode='contained' onPress={() => console.log(`go to matches with ${friend.username}`)}>View Matches</Button>
      <Button mode='contained' onPress={() => console.log(`go to likes with ${friend.username}`)}>View Likes</Button>
      <Button mode='contained' onPress={() => console.log(`go to dislikes with ${friend.username}`)}>View Dislikes</Button>
    </FormLayout>
  );
});

const UserOptions = observer(({ uiState }) => {
  const { friend } = uiState;

  return (
    <React.Fragment>
      <Title style={_style.title}>{`Your activity with ${friend.username}:`}</Title>
      <MatchActions uiState={uiState}/>
    </React.Fragment>
  );
});

export default UserOptions;
