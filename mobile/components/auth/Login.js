import { observer } from 'mobx-react';
import React from 'react';
import { View } from 'react-native';
import { Button, Text, Title } from 'react-native-paper';
import { withState } from '../../shared';
import { TextInput } from '../common';
import AuthState from './state/AuthState';

const Login = observer(({ uiState, navigation }) => {
  const {username, password, errors} = uiState
  return (
    <View>
      <Title>Login</Title>
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
    </View>
  );
})

export default withState(Login, AuthState)
