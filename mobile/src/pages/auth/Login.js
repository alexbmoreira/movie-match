import { Button, ScreenContainer, TextInput } from '@components/common';
import { withState } from '@shared';
import { observer } from 'mobx-react';
import React from 'react';
import { Text, Title } from 'react-native-paper';
import AuthState from './state/AuthState';

const Login = observer(({ uiState, navigation }) => {
  const {username, password, errors} = uiState
  return (
    <ScreenContainer center>
      <Title>Log In to Match Cut</Title>
      <TextInput
        placeholder="Username"
        value={username}
        onChange={value => uiState.updateUsername(value)}
        autoCapitalize="none"
        errorMessage={errors.username}
        autoCorrect={false}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChange={value => uiState.updatePassword(value)}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
        errorMessage={errors.password}
      />
      <Button onPress={uiState.login}>
        Log In
      </Button>
      <Text>Don't have an Account?</Text>
      <Text onPress={() => navigation.navigate('Register')}>Register</Text>
    </ScreenContainer>
  );
})

export default withState(Login, AuthState)
